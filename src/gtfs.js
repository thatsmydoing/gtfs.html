import * as Papa from 'papaparse';
import JSZip from 'jszip';

export const schema = {
  agency: '++agency_id',
  calendar: '++service_id',
  calendar_dates: '++,service_id',
  fare_attributes: '++fare_id',
  fare_rules: '++,fare_id,route_id',
  frequencies: '++,trip_id',
  routes: '++route_id',
  shapes: '[shape_id+shape_pt_sequence]',
  stops: '++stop_id',
  stop_times: '[trip_id+stop_sequence]',
  trips: '++trip_id, route_id'
};

function parseEntry(table, entry) {
  return new Promise((resolve, reject) => {
    console.log('Processing '+table+'.txt');
    console.time('parsing');
    let parser = new Papa.StringStreamer({
      header: true
    });
    parser._nextChunk = () => {}

    let promise = Promise.resolve();
    let stream = entry.internalStream('string');
    let list = [];

    stream
      .on('data', (chunk, metadata) => {
        let results = parser.parseChunk(chunk);
        Array.prototype.push.apply(list, results.data);
      })
      .on('end', () => {
        promise.then(() => {
          console.timeEnd('parsing');
          console.log('Parsing '+table+'.txt complete');
          resolve(list);
        })
      })
      .on('error', () => {
        console.log('Error in parsing '+table+'.txt');
        reject();
      })
      .resume();
  });
}

export function load(file) {
  let db = {};
  return JSZip.loadAsync(file).then(zip => {
    return Object.keys(schema).reduce((acc, table) => {
      let entry = zip.file(table+'.txt');
      if(entry != null) {
        return acc.then(_ => parseEntry(table, entry).then(list => db[table] = list));
      }
      else {
        db[table] = [];
        return acc;
      }
    }, Promise.resolve());
  }).then(_ => db)
}

export function save(db) {
  let zip = JSZip();
  Object.keys(schema)
    .filter(table => db[table].length > 0)
    .map(table => {
      let data = db[table];
      zip.file(table+'.txt', Papa.unparse(data));
    });
  return zip.generateAsync({type: 'blob'})
}
