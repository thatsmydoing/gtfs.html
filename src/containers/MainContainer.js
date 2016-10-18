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
  else if(props.path == undefined) {
    return (
      <div>
        <TreeContainer />
        <button onClick={props.onUnload}>Close</button>
      </div>
    )
  }
  else if(props.path.type == 'route') {
    return <div>{props.path.id}</div>
  }
  else {
    return <div>Not Found</div>
  }
}

function mapStateToProps(state) {
  let path = state.navigation[state.navigation.length - 1];
  return {path, ...state.feed};
}

function mapDispatchToProps(dispatch) {
  return {
    onUnload: () => dispatch(unloadFile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component);
