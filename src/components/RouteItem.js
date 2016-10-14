import React from 'react';

export default function RouteItem(props) {
  let name = props.route_short_name || props.route_long_name;
  return (
    <div className="route" title={name}>
      <span className="name">{name}</span>
      <span className="id">{props.route_id}</span>
    </div>
  )
}
