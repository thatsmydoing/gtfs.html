import React from 'react';
import {getService} from '../selectors';
import {calendarSchema} from '../constants';
import {pad, parseDate} from '../format';
import {daysOfWeek} from '../constants';
import Calendar from './Calendar';
import InfoTable from './InfoTable';
import TripList from './TripList';

export default function ServiceView(props) {
  let service = getService(props.feed, props.id);
  let start = parseDate(service.start_date);
  let end = parseDate(service.end_date);
  let dows = daysOfWeek.map(dow => service[dow] == 1);

  let startTime = start.getTime();
  let endTime = end.getTime();

  function classNameFor(dow, year, month, day) {
    let date = new Date(year, month, day).getTime();
    if(date < startTime || date > endTime) {
      return 'outofbounds';
    }
    let active = dows[dow];
    let dateStr = ''+year+pad(month+1, 2)+pad(day, 2);
    let exception = service.exceptions.find(exception => {
      return exception.date == dateStr && exception.exception_type == (active ? 2 : 1)
    });
    let className = '';
    if(exception != undefined) {
      let type = exception.exception_type;
      if(type == 1) {
        active = true;
      }
      else if(type == 2) {
        active = false;
      }
      className += 'exception ';
    }
    className += active ? 'active' : 'inactive';
    return className;
  }

  return (
    <div className="service">
      <div className="side">
        <InfoTable object={service} schema={calendarSchema} />
        <TripList trips={service.trips} />
      </div>
      <Calendar
        classNameFor={classNameFor}
        startYear={start.getFullYear()}
        endYear={end.getFullYear()} />
    </div>
  )
}
