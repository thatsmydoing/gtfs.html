import React from 'react';
import ReactDOM from 'react-dom';
import {saveAs} from 'file-saver';

import * as gtfs from './gtfs';

let stores = {};

function App(props) {
  let fileChange = event => {
    for(let i = 0; i < event.target.files.length; ++i) {
      let file = event.target.files[i];
      gtfs.load(file).then(db => {
        stores[file.name] = db;
        console.log('Finished importing '+file.name);
      });
    }
  };
  let fileSave = _ => {
    let fileName = 'gtfs.zip';
    let db = stores[fileName];
    gtfs.save(db).then(db => saveAs(db, fileName));
  };
  return (
    <div>
      <input type='file' onChange={fileChange} />
      <input type='button' value='Save File' onClick={fileSave} />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#container'));
