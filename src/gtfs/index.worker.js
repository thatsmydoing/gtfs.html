import * as Papa from 'papaparse';
import JSZip from 'jszip';
import {schema} from './schema';
import {index, indexDeferred} from './indexing';
import {
  message,
  validate,
  validateDeferred,
  checkReferences,
  checkDeferredReferences
} from './validation';

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

function loadEntry(db, zip, acc, table) {
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
}

function load(file) {
  let db = {
    errors: [],
    stats: {}
  };
  return JSZip.loadAsync(file).then(zip => {
    return Object.keys(schema)
      .filter(key => key !== 'shapes')
      .reduce((acc, table) => {
        return loadEntry(db, zip, acc, table);
      }, Promise.resolve())
      .then(_ => zip);
  }).then(zip => {
    validate(db, schema);
    index(db);
    checkReferences(db);
    if(db.errors.length > 0) {
      console.log(db.errors.length + ' error(s) found');
    }
    else {
      console.log('No errors found');
    }
    self.postMessage(db);
    return zip;
  }).then(zip => {
    return ['shapes'].reduce((acc, table) => {
      return loadEntry(db, zip, acc, table);
    }, Promise.resolve());
  }).then(_ => {
    validateDeferred(db, schema);
    indexDeferred(db);
    checkDeferredReferences(db);
    if(db.errors.length > 0) {
      console.log(db.errors.length + ' error(s) found');
    }
    else {
      console.log('No additional errors found');
    }
    self.postMessage(db);
    self.close();
  })
}

self.addEventListener('message', (event) => {
  load(event.data.file);
});
