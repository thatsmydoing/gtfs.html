import React from 'react';
import Dropzone from 'react-dropzone';

export default function FileUpload(props) {
  let onDrop = (acceptedFiles, rejectedFiles) => {
    let file = acceptedFiles[0];
    props.onDrop(file);
  }
  return (
    <Dropzone className="dropzone" activeClassName="active" onDrop={onDrop}>
      <div>Drop your GTFS feed here</div>
      <div>-- or --</div>
      <div>click here to select a file from your computer</div>
    </Dropzone>
  )
}
