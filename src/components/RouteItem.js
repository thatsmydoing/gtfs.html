import React from 'react';
import {routeTypes} from '../gtfs/schema';
import Link from './Link';

export default function RouteItem(props) {
  let name = props.route_short_name || props.route_long_name;
  let routeType = routeTypes[props.route_type] || `Unknown (${props.route_type})`;
  return (
    <div className="double-line" title={name}>
      <span>{name}</span>
      <span>
        [{routeType}] {props.route_id} <Link type='route' id={props.route_id}>Details</Link>
      </span>
    </div>
  )
}
