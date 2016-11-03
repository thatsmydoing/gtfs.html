import React from 'react';
import {tripSchema} from '../gtfs/schema';
import {getTrip, getTimetable} from '../selectors';
import InfoTable from './InfoTable';
import Timetable from './Timetable';

export default function TripView({feed, id}) {
  let trip = getTrip(feed, id);
  let timetable = getTimetable(feed, id);
  return (
    <div className="trip">
      <InfoTable object={trip} schema={tripSchema} />
      <Timetable stopTimes={timetable.stopTimes} frequencies={timetable.frequencies} />
    </div>
  )
}
