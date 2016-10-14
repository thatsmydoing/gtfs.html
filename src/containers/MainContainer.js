import React from 'react';
import {connect} from 'react-redux';
import {unloadFile} from '../actions';
import UploadContainer from './UploadContainer';
import TreeContainer from './TreeContainer';

function component(props) {
  if(props.loading) {
    return <p>Loading file...</p>
  }
  else if(props.error != null) {
    return (
      <div>
        <p>There was an error loading the file: {props.error + ""}</p>
        <button onClick={props.onUnload}>Ok</button>
      </div>
    )
  }
  else if(props.data == null) {
    return <UploadContainer />
  }
  else {
    return (
      <div>
        <TreeContainer />
        <button onClick={props.onUnload}>Close</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.feed;
}

function mapDispatchToProps(dispatch) {
  return {
    onUnload: () => dispatch(unloadFile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component);
