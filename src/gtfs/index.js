import * as Papa from 'papaparse';
import JSZip from 'jszip';
import {schema} from './schema';
import {index} from './indexing';
import {message, validate} from './validation';

function parseEntry(table, entry) {
  return new Promise((resolve, reject) => {
    console.log('Processing '+table+'.txt');
    console.time('parsing');
    let parser = new Papa.StringStreamer({
      header: true,
      dynamicTyping: false
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
          parser._finished = true;
          let results = parser.parseChunk('');
          Array.prototype.push.apply(list, results.data);
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
  let db = {
    errors: [],
    stats: {}
  };
  return JSZip.loadAsync(file).then(zip => {
    return Object.keys(schema).reduce((acc, table) => {
      let entry = zip.file(table+'.txt');
      if(entry != null) {
        return acc.then(_ => parseEntry(table, entry).then(list => {
          db[table] = list;
          db.stats[table] = list.length;
        }));
      }
      else {
        if(!schema[table].optional) {
          db.errors.push(message('error', table+'.txt', 0, 'Required file missing'));
        }
        db[table] = [];
        return acc;
      }
    }, Promise.resolve());
  }).then(_ => {
    validate(db, schema);
    index(db);
    return db;
  })
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
