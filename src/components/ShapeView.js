import React from 'react';
import {getShape} from '../selectors';
import TripList from './TripList';

export default function ShapeView({feed, id}) {
  let shape = getShape(feed, id);
  return (
    <div className="shape">
      <h3>Shape {shape.shape_id}</h3>
      <h4>Trips</h4>
      <TripList trips={shape.trips} />
    </div>
  )
}
