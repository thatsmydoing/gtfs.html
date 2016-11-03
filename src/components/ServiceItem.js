import React from 'react';
import {daysOfWeek} from '../constants';
import Link from './Link';

function format(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)+'s';
}

export default function ServiceItem(props) {
  let days = daysOfWeek.filter(dow => props[dow] == 1)
  let dows;
  if(days.length == 7) {
    dows = 'Everyday';
  }
  else if(days[0] == 'sunday' && days[1] == 'saturday') {
    dows = 'Weekends';
  }
  else if(days[0] == 'monday' && days[4] == 'friday') {
    dows = 'Weekdays';
  }
  else {
    dows = days.map(format).join(', ');
  }
  return (
    <div className="service double-line">
      <span>{dows}</span>
      <span>
        {props.start_date} - {props.end_date} <Link type='service' id={props.service_id}>Details</Link>
      </span>
    </div>
  )
}
