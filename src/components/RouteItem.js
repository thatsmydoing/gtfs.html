import React from 'react';

const routeTypes = [
  'Tram',
  'Subway',
  'Rail',
  'Bus',
  'Ferry',
  'Cable car',
  'Gondola',
  'Funicular'
]

export default function RouteItem(props) {
  let name = props.route_short_name || props.route_long_name;
  return (
    <div className="route" title={name}>
      <span className="name">{name}</span>
      <span className="id">[{routeTypes[props.route_type]}] {props.route_id}</span>
    </div>
  )
}
