import React from 'react';
import {link} from '../reducers/navigation';

export default function TripItem(props) {
  let name = props.trip_headsign || props.trip_short_name || 'Trip '+(props.index+1);
  return (
    <div className="double-line" title={name}>
      <span>{name}</span>
      <span>
        {props.trip_id} <a href={link('trips', props.trip_id)}>Details</a>
      </span>
    </div>
  )
}
