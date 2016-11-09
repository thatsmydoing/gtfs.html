import React from 'react';
import {getZone} from '../selectors';
import StopItem from './StopItem';

export default function ZoneView(props) {
  let zone = getZone(props.feed, props.id);
  let stops = zone.stops.map(s => {
    return <li key={s.stop_id}><StopItem {...s} /></li>
  });
  return (
    <div className="block">
      <h3>Zone {zone.zone_id}</h3>
      <h4>Stops</h4>
      <ul>{stops}</ul>
    </div>
  )
}

