import React from 'react';

export default function TripItem(props) {
  let name = props.trip_headsign || props.trip_short_name || 'Trip '+(props.index+1);
  return (
    <div className="trip" title={name}>
      <span>{name}</span>
      <span className="id">
        {props.trip_id}
      </span>
    </div>
  )
}
