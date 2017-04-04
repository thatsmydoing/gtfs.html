import React from 'react';
import {stopSchema} from '../gtfs/schema';
import {getStop} from '../selectors';
import InfoTable from './InfoTable';
import TripList from './TripList';
import Map from './map/Map';
import Marker from './map/Marker';

export default function StopView({feed, id}) {
  let stop = getStop(feed, id);
  let point = {lat: parseFloat(stop.stop_lat), lng: parseFloat(stop.stop_lon)};
  return (
    <div className="stop">
      <div className="info-column">
        <InfoTable object={stop} schema={stopSchema} />
        <TripList trips={stop.trips} />
      </div>
      <div className="map-column">
        <Map>
          <Marker point={point} />
        </Map>
      </div>
    </div>
  )
}
