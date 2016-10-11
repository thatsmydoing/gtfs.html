import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import {saveAs} from 'file-saver';

import * as gtfs from './gtfs';

let stores = {};

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: null
    }
  }
  render() {
    let onDrop = (acceptedFiles, rejectedFiles) => {
      let file = acceptedFiles[0];
      gtfs.load(file).then(
        feed => this.setState({feed: feed}),
        error => alert('Failed to load GTFS')
      );
    }
    if(this.state.feed == null) {
      return (
        <Dropzone className="dropzone" activeClassName="active" onDrop={onDrop}>
          <div>Drop your GTFS feed here</div>
          <div>-- or --</div>
          <div>click here to select a file from your computer</div>
        </Dropzone>
      )
    }
    else {
      return <div>GTFS loaded successfully!</div>
    }
  }
}

function App(props) {
  return <FileUpload />
}

ReactDOM.render(<App />, document.querySelector('#container'));
