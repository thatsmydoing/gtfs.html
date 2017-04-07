import React from 'react';
import {formatDaysOfWeek} from '../format';
import Link from './Link';

export default function ServiceItem(props) {
  let dows = formatDaysOfWeek(props);
  return (
    <div className="service double-line">
      <span>{dows}</span>
      <span>
        {props.start_date} - {props.end_date} <Link type='service' id={props.service_id}>Details</Link>
      </span>
    </div>
  )
}
