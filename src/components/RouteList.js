import React from 'react';

import RouteItem from './RouteItem';

export default function RouteList(props) {
  let routes = props.routes.map(route => {
    return <li key={route.route_id}><RouteItem {...route} navigateTo={props.navigateTo} /></li>
  });
  return <ul>{routes}</ul>
}
