import React from 'react';
import {connect} from 'react-redux';
import RouteView from '../components/RouteView';

function component(props) {
  return <RouteView {...props} />
}

function mapStateToProps(state) {
  let id = state.navigation.id;
  let feed = state.feed.data;
  let route = feed.routes.find(route => route.route_id == id);
  if(route == undefined) {
    return {};
  }
  else {
    route.trips = feed.trips.filter(trip => trip.route_id == id);
    return route;
  }
}

export default connect(mapStateToProps)(component);
