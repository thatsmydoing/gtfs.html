import {schema} from './schema';

function buildIndex(data, specs) {
  data.indices = data.indices || {};
  Object.keys(specs).forEach(table => {
    specs[table].forEach(spec => {
      if(data.indices[spec.name] === undefined) {
        data.indices[spec.name] = {};
      }
    });
    data[table].forEach((row, i) => {
      specs[table].forEach(spec => {
        let index = data.indices[spec.name];
        let key = row[spec.key];
        if(key === undefined || key === '') {
          return;
        }
        else if(spec.multiple) {
          if(index[key]) {
            index[key].push(i);
          }
          else {
            index[key] = [i];
          }
        }
        else {
          index[key] = i;
        }
      });
    });
  });
}

function buildStopTripsIndex(data) {
  let index = {};
  data.stop_times.forEach(s => {
    let key = s.stop_id;
    let tripIndex = data.indices.trips[s.trip_id];
    if(index[key]) {
      let set = index[key];
      if(set.indexOf(tripIndex) < 0) {
        set.push(tripIndex);
      }
    }
    else {
      index[key] = [tripIndex];
    }
  });
  data.indices['stop.trips'] = index;
  data.indexSpecs['stop.trips'] = {
    table: 'trips',
    multiple: true
  };
}

export function index(data) {
  console.log('Building indices...');
  console.time('indexing');
  data.indexSpecs = {};
  let specs = {};
  function indexSpec(name, table, key, multiple) {
    data.indexSpecs[name] = { table, key, multiple };
    let spec = { name, key, multiple };
    if(specs[table]) {
      specs[table].push(spec);
    }
    else {
      specs[table] = [spec];
    }
  }
  function deferredIndex(name, table, key, multiple) {
    data.indexSpecs[name] = { table, key, multiple };
  }

  Object.keys(schema).forEach(table => {
    let s = schema[table].schema;
    let pk = Object.keys(s).find(k => s[k].pk);
    if(pk) {
      indexSpec(table, table, pk);
    }
  });
  indexSpec('service.exceptions', 'calendar_dates', 'service_id', true);
  indexSpec('service.trips', 'trips', 'service_id', true);
  indexSpec('zone.stops', 'stops', 'zone_id', true);
  indexSpec('block.trips', 'trips', 'block_id', true);
  indexSpec('route.trips', 'trips', 'route_id', true);
  indexSpec('fare.rules', 'fare_rules', 'fare_id', true);
  indexSpec('trip.stopTimes', 'stop_times', 'trip_id', true);
  indexSpec('trip.frequencies', 'frequencies', 'trip_id', true);
  indexSpec('agency.routes', 'routes', 'agency_id', true);
  indexSpec('zone.rules', 'fare_rules', 'origin_id', true);
  indexSpec('zone.rules', 'fare_rules', 'destination_id', true);
  indexSpec('zone.rules', 'fare_rules', 'contains_id', true);
  deferredIndex('shape.points', 'shapes', 'shape_id', true);
  deferredIndex('shape.trips', 'trips', 'shape_id', true);

  buildIndex(data, specs);
  buildStopTripsIndex(data);
  console.timeEnd('indexing');
  console.log('Completed building indices.');
  return data;
}

export function indexDeferred(data) {
  console.log('Building expensive indices...');
  console.time('indexing');
  let specs = {};
  function indexSpec(name, table, key, multiple) {
    data.indexSpecs[name] = { table, key, multiple };
    let spec = { name, key, multiple };
    if(specs[table]) {
      specs[table].push(spec);
    }
    else {
      specs[table] = [spec];
    }
  }
  indexSpec('shape.points', 'shapes', 'shape_id', true);
  indexSpec('shape.trips', 'trips', 'shape_id', true);

  buildIndex(data, specs);
  console.timeEnd('indexing');
  console.log('Completed building expensive indices.');
  return data;
}

export function getIn(data, indexName, id) {
  let spec = data.indexSpecs[indexName];
  let index = data.indices[indexName];
  const get = id => {
    let item = data[spec.table][id];
    return {...item};
  }
  if(spec.multiple) {
    if(index && index[id] != undefined) {
      return index[id].map(get);
    }
    else {
      return [];
    }
  }
  else {
    if(index && index[id] != undefined) {
      return get(index[id]);
    }
    else {
      return null;
    }
  }
}
