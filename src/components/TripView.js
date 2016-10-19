import React from 'react';
import {tripSchema} from '../constants';
import {getService} from '../selectors';
import InfoTable from './InfoTable';

function getTrip(props) {
  let id = props.id;
  let feed = props.feed;
  let trip = feed.trips.find(trip => trip.trip_id == id);
  if(trip == undefined) {
    return {};
  }
  else {
    trip.service = getService(feed, trip.service_id);
    return trip;
  }
}

export default function TripView(props) {
  return (
    <InfoTable object={getTrip(props)} schema={tripSchema} />
  )
}
