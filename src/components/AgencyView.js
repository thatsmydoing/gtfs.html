import React from 'react';
import Optional from './Optional';
import RouteList from './RouteList';

function AgencyInfo(props) {
  return (
    <table>
      <tbody>
        <tr>
          <td>ID</td>
          <td>{props.agency_id}</td>
        </tr>
        <tr>
          <td>Name</td>
          <td>{props.agency_name}</td>
        </tr>
        <tr>
          <td>URL</td>
          <td>
            <Optional valid={props.agency_url}>
              <a href={props.agency_url}>{props.agency_url}</a>
            </Optional>
          </td>
        </tr>
        <tr>
          <td>Timezone</td>
          <td>{props.agency_timezone}</td>
        </tr>
        <tr>
          <td>Language</td>
          <td><Optional>{props.agency_language}</Optional></td>
        </tr>
        <tr>
          <td>Phone</td>
          <td><Optional>{props.agency_phone}</Optional></td>
        </tr>
        <tr>
          <td>Fare URL</td>
          <td>
            <Optional valid={props.agency_fare_url}>
              <a href={props.agency_fare_url}>{props.agency_fare_url}</a>
            </Optional>
          </td>
        </tr>
        <tr>
          <td>Email</td>
          <td><Optional>{props.agency_email}</Optional></td>
        </tr>
      </tbody>
    </table>
  )
}

function getAgency(props) {
  let id = props.id;
  let feed = props.feed;
  let agency = feed.agency.find(agency => agency.agency_id == id);
  if(agency == undefined) {
    return {};
  }
  else {
    agency.routes = feed.routes.filter(route => route.agency_id == id);
    return agency;
  }
}

export default function AgencyView(props) {
  let agency = getAgency(props);
  return (
    <div>
      <AgencyInfo {...agency} />
      <RouteList routes={agency.routes} />
    </div>
  )
}
