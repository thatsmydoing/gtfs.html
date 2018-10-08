import {difference, forEach, has, isPlainObject} from 'lodash';
import {daysPerMonth} from '../constants';

const STRICTER_MODE = false;

const floatRegex = /^-?\d+(\.?\d*)(e-?\d+)?$/;
const dateRegex = /^(\d{4})(\d{2})(\d{2})$/;
const timeRegex = /^(\d{2}):(\d{2}):(\d{2})$/;

const typeChecks = {
  boolean: checkRegex(/^(0|1)$/),
  url: checkRegex(/^https?:\/\/.*$/),
  email: checkRegex(/^.*@.*$/),
  uint: checkRegex(/^\d+$/),
  color: checkRegex(/^[0-9a-fA-F]{6}$/),
  float: checkRegex(floatRegex),
  latitude: checkCoords(-90, 90),
  longitude: checkCoords(-180, 180),
  time: checkTime,
  date: checkDate
}

function checkRegex(regex) {
  return item => {
    if(!regex.test(item)) {
      return "'"+item+"'";
    }
  }
}

function checkCoords(min, max) {
  return coord => {
    let result = floatRegex.test(coord);
    if(!result) {
      return 'not a float: '+coord;
    }
    let value = parseFloat(coord);
    if(value < min || value > max) {
      return 'out of bounds: '+coord;
    }
  }
}

function checkDate(date) {
  let result = dateRegex.exec(date);
  if(result == null) {
    return 'Invalid date: '+date;
  }

  let [, year, month, day] = result;
  year = parseInt(year);
  month = parseInt(month);
  day = parseInt(day);
  let leapYear = year % 400 == 0 || (year % 4 == 0 && year % 100 != 0);

  if(month < 1 || month > 12) {
    return 'wrong month: '+month;
  }

  let days = daysPerMonth[month-1] + ((month == 2 && leapYear) ? 1 : 0);
  if(day < 1 || day > days) {
    return 'wrong day: '+date;
  }
}

function checkTime(time) {
  let result = timeRegex.exec(time);
  if(result == null) {
    return 'invalid time: '+time;
  }

  let [, hour, minute, second] = result;
  hour = parseInt(hour);
  minute = parseInt(minute);
  second = parseInt(second);

  if(minute > 60 || second > 60) {
    return 'invalid time: '+time;
  }
}

function validateItem(item, line, col, field, schema, log) {
  let originalItem = item;
  let {type} = schema;
  item = item.trim();
  if(originalItem != item) {
    log('warning', line, 'Value has excess whitespace: \''+item+'\' for '+field);
    let match = item.match(/^"(.*)"$/);
    if(match != null) {
      item = match[1].replace(/""/, '"')
    }
  }
  if(Array.isArray(type)) {
    let index = parseInt(item);
    if(index < 0 || index >= type.length) {
      log('error', line, 'Invalid value: '+index+' for '+field);
    }
  }
  else if(typeof type == 'object') {
    if(type[item] == undefined) {
      log('error', line, 'Invalid value: '+item+' for '+field);
    }
  }
  else if(typeChecks[type] != undefined) {
    let result = typeChecks[type](item);
    if(result) {
      log('error', line, 'Invalid '+type+': '+result+' for '+field);
    }
  }
  if(originalItem != item) {
    return item;
  }
}

function validateRow(row, line, schema, log) {
  let keys = Object.keys(schema);
  keys.forEach((key, col) => {
    let itemSchema = schema[key];
    if(row[key] != undefined) {
      if(itemSchema.optional && row[key] == '') {
      }
      else {
        let newValue = validateItem(row[key], line, col, key, itemSchema, log);
        if(newValue != undefined) {
          row[key] = newValue;
        }
      }
    }
  });
}

function validate1(data, schema, log) {
  if(data.length == 0) {
    return;
  }

  let row = data[0];
  let keys = Object.keys(schema);
  let headers = Object.keys(row);
  let diff = difference(headers, keys);
  diff.forEach(key => {
    log('warning', 1, 'Unknown field: '+key);
  });
  keys.forEach(key => {
    let itemSchema = schema[key];
    if(!has(row, key) && !itemSchema.optional) {
      log('error', 1, 'Missing required field: '+key);
    }
  });

  data.forEach((row, i) => {
    validateRow(row, i+1, schema, log);
  });
}

function validateAgency(agencies, log) {
  if(agencies.length > 1) {
    agencies.forEach((agency, line) => {
      if(agency.agency_id == '') {
        log('error', 'agency.txt', line+1, 'Missing required field: agency_id');
      }
    });
  }
}

function validateRoutes(routes, log) {
  routes.forEach((route, line) => {
    if(route.route_short_name == '' && route.route_long_name == '') {
      log('error', 'routes.txt', line+1, 'One of route_short_name and route_long_name must be present');
    }
  });
}

function validateFeedInfo(feed_info, log) {
  if(feed_info.length > 1) {
    log('warning', 'feed_info.txt', 0, 'There are multiple feed_info entries');
  }
}

function updateTripStopTime(trip, stop_time, line) {
  let seq = parseInt(stop_time.stop_sequence);
  let present = !!stop_time.arrival_time && !!stop_time.departure_time;
  if(trip == null) {
    return {
      max: seq,
      max_present: present,
      max_line: line,
      min: seq,
      min_present: present,
      min_line: line,
    }
  }
  if(trip.max < stop_time.stop_sequence) {
    trip.max = seq;
    trip.max_present = present;
    trip.max_line = line;
  }
  if(trip.min > stop_time.stop_sequence) {
    trip.min = seq;
    trip.min_present = present;
    trip.min_line = line;
  }
  return trip;
}

function validateStopTimes(stop_times, log) {
  let trips = {};
  stop_times.forEach((stop_time, line) => {
    let trip = trips[stop_time.trip_id];
    trips[stop_time.trip_id] = updateTripStopTime(trip, stop_time, line);
    if(stop_time.timepoint) {
      if(!stop_time.arrival_time || !stop_time.departure_time) {
        log('error', 'stop_times.txt', line+1, 'Timepoint must have arrival_time and departure_time present');
      }
    }
  });
  Object.keys(trips).forEach(key => {
    let trip = trips[key];
    if(!trip.min_present) {
      log('error', 'stop_times.txt', trip.min_line+1, 'First stop_time must have arrival_time and departure_time present');
    }
    if(!trip.max_present) {
      log('error', 'stop_times.txt', trip.max_line+1, 'Last stop_time must have arrival_time and departure_time present');
    }
  });
}

export function validate(data, schema) {
  console.log('Validating...');
  console.time('validating');
  Object.keys(schema)
    .filter(key => key !== 'shapes')
    .forEach(table => {
      let log = (type, line, text) => {
        data.errors.push(message(type, table+'.txt', line, text));
      }
      validate1(data[table], schema[table].schema, log);
    });
  let log = (type, file, line, text) => {
    data.errors.push(message(type, file, line, text));
  }
  validateAgency(data.agency, log);
  validateRoutes(data.routes, log);
  validateFeedInfo(data.feed_info, log);
  validateStopTimes(data.stop_times, log);
  console.timeEnd('validating');
  console.log('Completed initial validation.');
}

export function validateDeferred(data, schema) {
  console.log('Validating shapes...');
  console.time('validating');
  let log = (type, line, text) => {
    data.errors.push(message(type, 'shapes.txt', line, text));
  }
  validate1(data['shapes'], schema['shapes'].schema, log);
  console.timeEnd('validating');
  console.log('Completed initial shape and stop time validation.');
}

/**
 * This function is a helper function to check references by comparing indices.
 * IDs appearing only in the source mean they are unused. IDs appearing only in
 * the reference index mean these IDs are missing. Unused IDs are only warnings
 * and can optionally be silenced if the reference index is optional. Missing
 * IDs are always errors.
 */
function checkIndices(data, source, index, optional = false) {
  let sourceIndex = data.indices[source];
  let referenceIndex = data.indices[index];
  let sourceIndexSpec = data.indexSpecs[source];
  let referenceIndexSpec = data.indexSpecs[index];

  let sourceIds = Object.keys(sourceIndex);
  let referencedIds = Object.keys(referenceIndex);
  let unusedIds = difference(sourceIds, referencedIds);
  let missingIds = difference(referencedIds, sourceIds);

  function log(type, file, ids, text) {
    if(Array.isArray(ids)) {
      ids.forEach(id => data.errors.push(message(
        type,
        file,
        id+1,
        text
      )));
    }
    else {
      data.errors.push(message(
        type,
        file,
        ids+1,
        text
      ));
    }
  }

  if(!optional) {
    unusedIds.forEach(id => {
      log(
        'warning',
        sourceIndexSpec.table+'.txt',
        sourceIndex[id],
        'The entry '+id+' is unused'
      );
    })
  }
  missingIds.forEach(id => {
    log(
      'error',
      referenceIndexSpec.table+'.txt',
      referenceIndex[id],
      'The referenced entry '+id+' does not exist'
    );
  })
}

/**
 * This function checks if a block contains only one trip. While this is not a
 * problem in itself, it might indicate mislabeled blocks. As this is
 * potentially naggy, the check is normally behind a flag.
 */
function checkBlockIndices(data) {
  forEach(data.indices['block.trips'], (arr, block) => {
    if(arr.length == 1) {
      data.errors.push(message(
        'warning',
        'trips.txt',
        arr[0],
        'Block '+block+' has only one trip'
      ));
    }
  });
}

/**
 * This function checks if the references between tables are valid. We do the
 * checking by comparing indices. Currently, some potentially naggy checks are
 * behind a strict flag. These include unused zones and blocks having only one
 * trip. Setting STRICTER_MODE to true will enable these checks.
 *
 * TODO currently we don't fully check stop references. Stops can reference each
 * other via the parent_station field and some stops are exits which don't need
 * to be referenced themselves.
 */
export function checkReferences(data) {
  console.log('Checking references...');
  console.time('reference check');
  checkIndices(data, 'calendar', 'service.exceptions', true);
  checkIndices(data, 'calendar', 'service.trips');
  checkIndices(data, 'routes', 'route.trips');
  checkIndices(data, 'fare_attributes', 'fare.rules');
  checkIndices(data, 'trips', 'trip.stopTimes');
  checkIndices(data, 'trips', 'trip.frequencies', true);
  checkIndices(data, 'stops', 'stop.trips', true);
  checkIndices(data, 'agency', 'agency.routes');
  checkIndices(data, 'zone.stops', 'zone.rules', !STRICTER_MODE);
  if(STRICTER_MODE) {
    checkBlockIndices(data);
  }
  console.timeEnd('reference check');
  console.log('Completed reference check.');
}

export function checkDeferredReferences(data) {
  console.log('Checking shape and stop time references...');
  console.time('reference check');
  checkIndices(data, 'shape.points', 'shape.trips');
  console.timeEnd('reference check');
  console.log('Completed shape and stop time reference check.');
}

export function message(type, file, line, message) {
  return {
    type,
    file,
    line,
    message
  }
}
