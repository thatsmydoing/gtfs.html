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
  function onDetails(e) {
    e.preventDefault();
    props.navigateTo({type: 'route', id: props.route_id});
  }
  return (
    <div className="route" title={name}>
      <span className="name">{name}</span>
      <span className="id">
        [{routeTypes[props.route_type]}] {props.route_id} <a href onClick={onDetails}>Details</a>
      </span>
    </div>
  )
}
