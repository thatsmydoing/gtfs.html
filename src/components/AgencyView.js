import React from 'react';
import {agencySchema} from '../gtfs/schema';
import {getAgency} from '../selectors';
import InfoTable from './InfoTable';
import RouteList from './RouteList';

function AgencyInfo(props) {
  return (
    <InfoTable object={props} schema={agencySchema} />
  )
}

export default function AgencyView({feed, id}) {
  let agency = getAgency(feed, id);
  return (
    <div>
      <AgencyInfo {...agency} />
      <RouteList routes={agency.routes} />
    </div>
  )
}
