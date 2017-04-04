import React from 'react';
import {getShape} from '../selectors';
import TripList from './TripList';
import Map from './map/Map';
import Polyline from './map/Polyline';

export default function ShapeView({feed, id}) {
  let shape = getShape(feed, id);
  let points = shape.points.map(point => {
    return {lat: point.shape_pt_lat, lng: point.shape_pt_lon};
  });
  return (
    <div className="shape">
      <h3>Shape {shape.shape_id}</h3>
      <div className="shape-container">
        <div className="trip-column">
          <h4>Trips</h4>
          <TripList trips={shape.trips} />
        </div>
        <div className="map-column">
          <Map>
            <Polyline points={points} />
          </Map>
        </div>
      </div>
    </div>
  )
}
