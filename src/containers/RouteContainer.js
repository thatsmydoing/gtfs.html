import React from 'react';
import {connect} from 'react-redux';
import RouteView from '../components/RouteView';

function component(props) {
  return <RouteView {...props.route} />
}

function mapStateToProps(state) {
  let id = state.navigation.id;
  let result = {};
  for(let i = 0; i < state.feed.data.routes.length; ++i) {
    let route = state.feed.data.routes[i];
    if(route.route_id == id) {
      result.route = route;
      break;
    }
  }
  return result;
}

export default connect(mapStateToProps)(component);
