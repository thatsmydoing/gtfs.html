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

let fileInput = document.querySelector('#file');
fileInput.addEventListener('change', event => {
  for(let i = 0; i < event.target.files.length; ++i) {
    let file = event.target.files[i];
    let db = dbForName(file.name);
    loadFile(file, db).then(() => {
      console.log('Finished importing '+file.name);
    });
  }
});

function dbForName(name) {
  let db = new Dexie(name);
  db.version(1).stores(schema);
  return db;
}

function parseEntry(db, table, entry) {
  return new Promise((resolve, reject) => {
    console.log('Processing '+table+'.txt');
    console.time('parsing');
    let parser = new Papa.StringStreamer({
      header: true
    });
    parser._nextChunk = () => {}

    let promise = Promise.resolve();
    let stream = entry.internalStream('string');

    stream
      .on('data', (chunk, metadata) => {
        stream.pause();
        let results = parser.parseChunk(chunk);
        promise = db[table].bulkPut(results.data).then(() => {
          stream.resume();
        });
      })
      .on('end', () => {
        promise.then(() => {
          console.timeEnd('parsing');
          console.log('Parsing '+table+'.txt complete');
          resolve();
        })
      })
      .on('error', () => {
        console.log('Error in parsing '+table+'.txt');
        reject();
      })
      .resume();
  });
}

function loadFile(file, db) {
  return JSZip.loadAsync(file).then(zip => {
    return Object.keys(schema).reduce((acc, table) => {
      let entry = zip.file(table+'.txt');
      if(entry != null) {
        return acc.then(() => parseEntry(db, table, entry));
      }
      else {
        return acc;
      }
    }, Promise.resolve());
  })
}
