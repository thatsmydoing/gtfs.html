import React from 'react';
import {routeSchema} from '../gtfs/schema';
import {getRoute} from '../selectors';
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


export default function RouteView({feed, id}) {
  let route = getRoute(feed, id);
  return (
    <div>
      <RouteInfo {...route} />
      <TripList trips={route.trips} />
    </div>
  )
}
