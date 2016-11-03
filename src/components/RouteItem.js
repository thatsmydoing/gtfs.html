import React from 'react';
import {routeTypes} from '../constants';
import Link from './Link';

export default function RouteItem(props) {
  let name = props.route_short_name || props.route_long_name;
  return (
    <div className="double-line" title={name}>
      <span>{name}</span>
      <span>
        [{routeTypes[props.route_type]}] {props.route_id} <Link type='route' id={props.route_id}>Details</Link>
      </span>
    </div>
  )
}
