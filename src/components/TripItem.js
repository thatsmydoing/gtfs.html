import React from 'react';
import Link from './Link';

export default function TripItem(props) {
  let name = props.trip_headsign || props.trip_short_name || 'Trip '+(props.index+1);
  return (
    <div className="double-line" title={name}>
      <span>{name}</span>
      <span>
        {props.trip_id} <Link type='trip' id={props.trip_id}>Details</Link>
      </span>
    </div>
  )
}
