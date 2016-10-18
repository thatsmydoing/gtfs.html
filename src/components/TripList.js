import React from 'react';
import TripItem from './TripItem';

export default function TripList(props) {
  let trips = props.trips.map((trip, index) => {
    return <li key={trip.trip_id}><TripItem index={index} {...trip} /></li>
  });
  return <ul>{trips}</ul>
}
