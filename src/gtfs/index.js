import * as Papa from 'papaparse';
import JSZip from 'jszip';
import {schema} from './schema';
import GTFSWorker from './index.worker';

export function load(file) {
  const worker = new GTFSWorker();
  return new Promise((resolve, reject) => {
    worker.addEventListener('message', (event) => {
      resolve(event.data);
    });
    worker.addEventListener('error', (error) => {
      reject(error);
    });
    worker.postMessage({ file });
  });
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
