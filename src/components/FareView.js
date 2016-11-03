import React from 'react';
import {fareAttributesSchema} from '../constants';
import {getFare} from '../selectors';
import InfoTable from './InfoTable';
import Link from './Link';

function FareRuleDescription({rules}) {
  if(rules.length == 0) {
    return <p>No rules specified.</p>
  }

  let allContains = rules.every(r => r.contains_id != undefined && r.contains_id != '');
  if(allContains) {
    let route = rules[0].route_id;
    let description;
    if(route == undefined) {
      description = <p>Applies to all trips that pass through all of the following zones:</p>
    }
    else {
      description = (
        <p>
          Applies to trips on route
          {' '}
          <a href={link('route', route)}>{route}</a>
          {' '}
          and pass through all of the following zones:
        </p>
      )
    }
    let zones = rules.map(r => {
      return (
        <li key={r.contains_id}>
          <Link type='zone' id={r.contains_id} />
        </li>
      )
    });
    return (
      <div>
        {description}
        <ul>{zones}</ul>
      </div>
    )
  }
  else {
    let conditions = rules.map((r, i) => {
      let route = null;
      if(r.route_id) {
        route = <span> on route <Link type='route' id={r.route_id} /></span>;
      }
      let from = null;
      if(r.origin_id) {
        from = <span> from zone <Link type='zone' id={r.origin_id} /></span>;
      }
      let to = null;
      if(r.destination_id) {
        to = <span> to zone <Link type='zone' id={r.destination_id} /></span>;
      }
      return <li key={i}>Trips{route}{from}{to}</li>
    });
    return (
      <div>
        <p>Applies to any of the following:</p>
        <ul>{conditions}</ul>
      </div>
    )
  }
}

export default function FareView(props) {
  let fare = getFare(props.feed, props.id);
  return (
    <div className="fare">
      <InfoTable object={fare} schema={fareAttributesSchema} />
      <FareRuleDescription rules={fare.rules} />
    </div>
  )
}
