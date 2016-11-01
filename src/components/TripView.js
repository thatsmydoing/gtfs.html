import React from 'react';
import {tripSchema} from '../constants';
import {getService, getTimetable} from '../selectors';
import InfoTable from './InfoTable';
import Timetable from './Timetable';

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
  let trip = getTrip(props);
  let timetable = getTimetable(props.feed, props.id);
  return (
    <div className="trip">
      <InfoTable object={trip} schema={tripSchema} />
      <Timetable stopTimes={timetable.stopTimes} frequencies={timetable.frequencies} />
    </div>
  )
}
