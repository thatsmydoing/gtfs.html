import React from 'react';
import {connect} from 'react-redux';
import {navigateTo} from '../actions';
import RouteList from '../components/RouteList';

function component(props) {
  return <RouteList routes={props.routes} navigateTo={props.navigateTo} />
}

function mapStateToProps(state) {
  return state.feed.data || {};
}

function mapDispatchToProps(dispatch) {
  return {
    navigateTo: target => dispatch(navigateTo(target))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component);
