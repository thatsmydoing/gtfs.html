import React from 'react';
import {connect} from 'react-redux';
import {unloadFile} from '../actions';
import Link from '../components/Link';
import RouteList from '../components/RouteList';
import RouteView from '../components/RouteView';
import AgencyView from '../components/AgencyView';
import TripView from '../components/TripView';
import ServiceView from '../components/ServiceView';
import BlockView from '../components/BlockView';
import FareView from '../components/FareView';
import ZoneView from '../components/ZoneView';
import StopView from '../components/StopView';
import ShapeView from '../components/ShapeView';
import StatsView from '../components/StatsView';
import ErrorList from '../components/ErrorList';
import DashboardView from '../components/DashboardView';
import UploadContainer from './UploadContainer';

const componentMap = {
  route: RouteView,
  agency: AgencyView,
  trip: TripView,
  service: ServiceView,
  block: BlockView,
  fare: FareView,
  zone: ZoneView,
  stop: StopView,
  shape: ShapeView
}

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
        <DashboardView feed={props.data} />
        <Link type="routes">Routes</Link>
        {' '}
        <button onClick={props.onUnload}>Close</button>
      </div>
    )
  }
  else if(props.path.type == 'routes') {
    return <RouteList routes={props.data.routes} />
  }
  else if(componentMap[props.path.type]) {
    let View = componentMap[props.path.type];
    return <View id={props.path.id} feed={props.data} />
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
