import {schema, fields} from './schema';

function buildIndex(data, specs) {
  data.indices = {};
  Object.keys(specs).forEach(table => {
    specs[table].forEach(spec => {
      data.indices[spec.name] = {};
    });
    data[table].forEach((row, i) => {
      specs[table].forEach(spec => {
        let index = data.indices[spec.name];
        let key = row[spec.key];
        if(spec.multiple) {
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

  Object.keys(schema).forEach(table => {
    let s = schema[table];
    let pk = fields(s).find(k => s[k].pk);
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

  buildIndex(data, specs);
  console.timeEnd('indexing');
  console.log('Completed building indices.');
  return data;
}

export function getIn(data, indexName, id) {
  let spec = data.indexSpecs[indexName];
  let index = data.indices[indexName];
  const get = id => data[spec.table][id];
  if(spec.multiple) {
    if(index[id] != undefined) {
      return index[id].map(get);
    }
    else {
      return [];
    }
  }
  else {
    if(index[id] != undefined) {
      return get(index[id]);
    }
    else {
      return null;
    }
  }
}
