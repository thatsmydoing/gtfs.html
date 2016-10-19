import React from 'react';
import {routeTypes} from '../constants';
import {link} from '../reducers/navigation';
import Color from './Color';
import Optional from './Optional';
import TripList from './TripList';

function RouteInfo(props) {
  let sampleStyle = {
    backgroundColor: props.route_color ? '#'+props.route_color : '#FFFFFF',
    color: props.route_text_color ? '#'+props.route_text_color : '#000000'
  }
  return (
    <table>
      <tbody>
        <tr>
          <td>Agency</td>
          <td>
            <Optional valid={props.agency_id}>
              <a href={link('agency', props.agency_id)}>{props.agency_id}</a>
            </Optional>
          </td>
        </tr>
        <tr>
          <td>ID</td>
          <td>{props.route_id}</td>
        </tr>
        <tr>
          <td>Short Name</td>
          <td><Optional>{props.route_short_name}</Optional></td>
        </tr>
        <tr>
          <td>Long Name</td>
          <td><Optional>{props.route_long_name}</Optional></td>
        </tr>
        <tr>
          <td>Description</td>
          <td><Optional>{props.route_description}</Optional></td>
        </tr>
        <tr>
          <td>URL</td>
          <td>
            <Optional valid={props.route_url}>
              <a href={props.route_url}>{props.route_url}</a>
            </Optional>
          </td>
        </tr>
        <tr>
          <td>Type</td>
          <td>{routeTypes[props.route_type]}</td>
        </tr>
        <tr>
          <td>Color</td>
          <td>
            <Optional valid={props.route_color}>
              <Color color={props.route_color} />
            </Optional>
          </td>
        </tr>
        <tr>
          <td>Text Color</td>
          <td>
            <Optional valid={props.route_text_color}>
              <Color color={props.route_text_color} />
            </Optional>
          </td>
        </tr>
        <tr>
          <td>Sample</td>
          <td>
            <span className="sample" style={sampleStyle}>
              {props.route_short_name || props.route_long_name || 'Sample'}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

function getRoute(props) {
  let id = props.id;
  let feed = props.feed;
  let route = feed.routes.find(route => route.route_id == id);
  if(route == undefined) {
    return {};
  }
  else {
    route.trips = feed.trips.filter(trip => trip.route_id == id);
    return route;
  }
}

export default function RouteView(props) {
  let route = getRoute(props);
  return (
    <div>
      <RouteInfo {...route} />
      <TripList trips={route.trips} />
    </div>
  )
}
