import React from 'react';
import {agencySchema} from '../gtfs/schema';
import InfoTable from './InfoTable';
import RouteList from './RouteList';

function AgencyInfo(props) {
  return (
    <InfoTable object={props} schema={agencySchema} />
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
