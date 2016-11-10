import {fields} from './schema';
import {difference, has, isPlainObject} from 'lodash';
import {daysPerMonth} from '../constants';

const floatRegex = /^-?\d+(\.?\d*)$/;
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
      return 'Invalid value';
    }
  }
}

function checkCoords(min, max) {
  return coord => {
    let result = floatRegex.test(coord);
    if(!result) {
      return 'Invalid coordinate value';
    }
    let value = parseFloat(coord);
    if(value < min || value > max) {
      return 'Coordinate out of bounds';
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
    return 'Invalid time: '+time;
  }

  let [, hour, minute, second] = result;
  hour = parseInt(hour);
  minute = parseInt(minute);
  second = parseInt(second);

  if(minute > 60 || second > 60) {
    return 'Invalid time: '+time;
  }
}

function validateItem(item, line, col, field, schema, log) {
  let {type} = schema;
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
}

function validateRow(row, line, schema, log) {
  let keys = fields(schema);
  keys.forEach((key, col) => {
    let itemSchema = schema[key];
    if(row[key] != undefined) {
      if(itemSchema.optional && row[key] == '') {
      }
      else {
        validateItem(row[key], line, col, key, itemSchema, log);
      }
    }
  });
}

function validate1(data, schema, log) {
  if(data.length == 0) {
    return;
  }

  let row = data[0];
  let keys = fields(schema);
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

export function validate(data, schema) {
  console.log('Validating...');
  console.time('validating');
  Object.keys(schema).forEach(table => {
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
  console.timeEnd('validating');
  if(data.errors.length > 0) {
    console.log(data.errors.length + ' error(s) found');
  }
  else {
    console.log('No errors found');
  }
}

export function message(type, file, line, message) {
  return {
    type,
    file,
    line,
    message
  }
}
