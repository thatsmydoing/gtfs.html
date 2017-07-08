import React from 'react';
import {minBy} from 'lodash';
import {getShape} from '../selectors';
import Map from './map/Map';
import Marker from './map/Marker';
import Polyline from './map/Polyline';

function distSquared(pointA, pointB) {
  let x = pointA.lat - pointB.lat;
  let y = pointA.lng - pointA.lng;
  return x*x + y*y;
}

function trimPoints(points, firstStop, lastStop) {
  let indices = points.map((point, index) => {
    return {
      index: index,
      fromFirst: distSquared(point, firstStop),
      fromLast: distSquared(point, lastStop)
    }
  });

  let startIndex = minBy(indices, 'fromFirst').index;
  let endIndex = minBy(indices, 'fromLast').index;
  return points.slice(startIndex, endIndex);
}

export default function TripMap({timetable, shape}) {
  let shapePoints = shape.points.map(point => {
    return {
      lat: parseFloat(point.shape_pt_lat),
      lng: parseFloat(point.shape_pt_lon)
    };
  });

  let stops = timetable.stopTimes.map(stopTime => {
    let stop = stopTime.stop;
    return {
      name: stop.stop_name,
      point: {
        lat: parseFloat(stop.stop_lat),
        lng: parseFloat(stop.stop_lon)
      }
    }
  });

  let firstStop = stops[0].point;
  let lastStop = stops[stops.length - 1].point;

  let points = stops.map(stop => stop.point);
  if(shapePoints.length > 0) {
    points = trimPoints(shapePoints, firstStop, lastStop);
  }
  let markers = stops.map((stop, index) => {
    return (
      <Marker
        key={index}
        point={stop.point}
        content={'<h4>'+stop.name+'</h4>'}
        label={String.fromCharCode(65+index%26)} />
    )
  });

  return (
    <Map>
      {markers}
      <Polyline points={points} />
    </Map>
  )
}
