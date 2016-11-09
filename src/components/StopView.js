import React from 'react';
import {stopSchema} from '../gtfs/schema';
import {getStop} from '../selectors';
import InfoTable from './InfoTable';
import TripList from './TripList';

export default function StopView({feed, id}) {
  let stop = getStop(feed, id);
  return (
    <div>
      <InfoTable object={stop} schema={stopSchema} />
      <TripList trips={stop.trips} />
    </div>
  )
}
