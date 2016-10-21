import React from 'react';
import {connect} from 'react-redux';
import {unloadFile} from '../actions';
import RouteView from '../components/RouteView';
import AgencyView from '../components/AgencyView';
import TripView from '../components/TripView';
import ServiceView from '../components/ServiceView';
import BlockView from '../components/BlockView';
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
    return <RouteView id={props.path.id} feed={props.data} />
  }
  else if(props.path.type == 'agency') {
    return <AgencyView id={props.path.id} feed={props.data} />
  }
  else if(props.path.type == 'trip') {
    return <TripView id={props.path.id} feed={props.data} />
  }
  else if(props.path.type == 'service') {
    return <ServiceView id={props.path.id} feed={props.data} />
  }
  else if(props.path.type == 'block') {
    return <BlockView id={props.path.id} feed={props.data} />
  }
  else {
    return <div>Not Found</div>
  }
}

function mapStateToProps(state) {
  let path = state.navigation;
  return {path, ...state.feed};
}

function mapDispatchToProps(dispatch) {
  return {
    onUnload: () => dispatch(unloadFile())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component);
