let schema = {
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

let stores = {};

let fileInput = document.querySelector('#file');
fileInput.addEventListener('change', event => {
  for(let i = 0; i < event.target.files.length; ++i) {
    let file = event.target.files[i];
    loadFile(file).then(db => {
      stores[file.name] = db;
      console.log('Finished importing '+file.name);
    });
  }
});

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

function loadFile(file) {
  let db = {};
  return JSZip.loadAsync(file).then(zip => {
    return Object.keys(schema).reduce((acc, table) => {
      let entry = zip.file(table+'.txt');
      if(entry != null) {
        return acc.then(db => {
          return parseEntry(table, entry).then(list => {
            db[table] = list;
            return db;
          });
        });
      }
      else {
        return acc;
      }
    }, Promise.resolve(db));
  })
}

function saveFile(file, db) {
  db = db || stores[file];
  let zip = JSZip();
  Object.keys(schema)
    .filter(table => db[table])
    .map(table => {
      let data = db[table];
      zip.file(table+'.txt', Papa.unparse(data));
    });
  zip.generateAsync({type: 'blob'}).then(content => {
    saveAs(content, file);
  });
}
