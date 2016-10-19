import React from 'react';
import {routeSchema} from '../constants';
import InfoTable, {Entry} from './InfoTable';
import TripList from './TripList';

function RouteInfo(props) {
  let sampleStyle = {
    backgroundColor: props.route_color ? '#'+props.route_color : '#FFFFFF',
    color: props.route_text_color ? '#'+props.route_text_color : '#000000'
  }
  return (
    <InfoTable object={props} schema={routeSchema}>
      <Entry name="Sample">
        <span className="sample" style={sampleStyle}>
          {props.route_short_name || props.route_long_name || 'Sample'}
        </span>
      </Entry>
    </InfoTable>
  )
}

function getRoute(props) {
  let id = props.id;
  let feed = props.feed;
  let route = feed.routes.find(route => route.route_id == id);
  if(route == undefined) {
    return {};
  }
  else {
    route.trips = feed.trips.filter(trip => trip.route_id == id);
    return route;
  }
}

export default function RouteView(props) {
  let route = getRoute(props);
  return (
    <div>
      <RouteInfo {...route} />
      <TripList trips={route.trips} />
    </div>
  )
}
