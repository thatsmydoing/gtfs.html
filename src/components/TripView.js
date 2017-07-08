import React from 'react';
import {tripSchema} from '../gtfs/schema';
import {getShape, getTrip, getTimetable} from '../selectors';
import InfoTable from './InfoTable';
import Timetable from './Timetable';
import TripMap from './TripMap';

export default function TripView({feed, id}) {
  let trip = getTrip(feed, id);
  let shape = getShape(feed, trip.shape_id);
  let timetable = getTimetable(feed, id);
  return (
    <div className="trip">
      <div className="top-section">
        <div className="info-section">
          <InfoTable object={trip} schema={tripSchema} />
        </div>
        <div className="map-section">
          <TripMap timetable={timetable} shape={shape} />
        </div>
      </div>
      <Timetable stopTimes={timetable.stopTimes} frequencies={timetable.frequencies} />
    </div>
  )
}
