import React from 'react';
import {connect} from 'react-redux';
import RouteList from '../components/RouteList';

function component(props) {
  return <RouteList routes={props.routes} />
}

function mapStateToProps(state) {
  return state.feed.data || {};
}

export default connect(mapStateToProps)(component);
