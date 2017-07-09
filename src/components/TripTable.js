import React, {Component} from 'react';
import {find, forIn, groupBy, min, max, maxBy} from 'lodash';
import naturalSort from 'javascript-natural-sort';
import {getRoute, getTimetable, getService, getStop} from '../selectors';
import {formatDuration, formatTime, formatDaysOfWeek, parseTime} from '../format';
import {getFullBounds, getTripBounds, getActualFrequencyBounds} from '../util';
import Link from './Link';

function SimpleTimeBar({label, all, startTime, lastStartTime, endTime}) {
  let globalDuration = all.endTime - all.startTime;
  let duration = endTime - startTime;
  let offset = startTime - all.startTime;
  let style = {
    width: (duration / globalDuration * 100)+'%',
    left: (offset / globalDuration * 100)+'%'
  }
  let className = "timebar";
  let inner = null;
  if(lastStartTime) {
    let innerOffset = lastStartTime - all.startTime - offset;
    let innerStyle = {
      marginLeft: (innerOffset / duration * 100)+'%'
    }
    inner = <div className="trail" style={innerStyle} />
    className = "timebar inexact";
  }
  return (
    <div className={className} title={label} style={style}>
      {inner}
    </div>
  )
}

function TimeBar({all, stopTimes, frequencies}) {
  if(frequencies.length > 0) {
    let duration = parseTime(stopTimes[stopTimes.length - 1].arrival_time) - parseTime(stopTimes[0].departure_time);
    let timebars = frequencies.map((f, index) => {
      let { startTime, endTime } = getActualFrequencyBounds(f);
      if(f.exact_times == 1 && duration < f.headway_secs) {
        let simpleBars = [];
        let t = startTime;
        while(t <= endTime) {
          let label = formatTime(t)+' - '+formatTime(t+duration)+' ('+formatDuration(duration)+')';
          simpleBars.push(
            <SimpleTimeBar
              key={t}
              label={label}
              all={all}
              startTime={t}
              endTime={t+duration} />
          )
          t += parseInt(f.headway_secs);
        }
        return simpleBars;
      }
      else {
        let numTrips = Math.floor((endTime - startTime) / f.headway_secs) + 1;
        if(f.exact_times != 1) {
          numTrips = '~'+numTrips;
        }
        let label = formatTime(startTime)+' - '+formatTime(endTime)+' ('+formatDuration(duration)+') '+numTrips+' trips every '+formatDuration(f.headway_secs);
        return (
          <SimpleTimeBar
            key={index}
            label={label}
            all={all}
            startTime={startTime}
            lastStartTime={endTime}
            endTime={endTime + duration} />
        )
      }
    });
    return <div>{timebars}</div>
  }
  else {
    let startTime = parseTime(stopTimes[0].departure_time);
    let endTime = parseTime(stopTimes[stopTimes.length - 1].arrival_time);
    let duration = endTime - startTime;
    let label = formatTime(startTime)+' - '+formatTime(endTime)+' ('+formatDuration(duration)+')';
    return (
      <SimpleTimeBar
        label={label}
        all={all}
        startTime={startTime}
        endTime={endTime} />
    )
  }
}

function TripRow(props) {
  let name = props.trip_headsign || props.trip_short_name || props.trip_id;
  let dows = 'Unknown';
  if(props.service) {
    dows = formatDaysOfWeek(props.service);
  }
  return (
    <tr>
      <td>{props.group.name}</td>
      <td><Link type="trip" id={props.trip_id}>{name}</Link></td>
      <td>{dows}</td>
      <td className="time-column">
        <TimeBar all={props.all} {...props.timetable} />
      </td>
    </tr>
  )
}

let dowOrder = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
];

function getServiceValue(service) {
  if(service == null) {
    return 0;
  }
  else {
    let result = dowOrder.findIndex((dow, index) => {
      if(service[dow] == 1) {
        return index+1;
      }
    });
    if(result) {
      return result;
    }
    else {
      return 0;
    }
  }
}
function sortByTime(a, b) {
  let serviceDiff = getServiceValue(a.service) - getServiceValue(b.service);
  if(serviceDiff == 0) {
    let aTime = parseTime(a.timetable.stopTimes[0].departure_time);
    let bTime = parseTime(b.timetable.stopTimes[0].departure_time);
    return aTime - bTime;
  }
  return serviceDiff;
}

function sortByName(a, b) {
  let aName = a.trip_headsign || a.trip_short_name || a.trip_id;
  let bName = b.trip_headsign || b.trip_short_name || b.trip_id;
  let value = naturalSort(aName, bName);
  if(value == 0) {
    return sortByTime(a, b);
  }
  else {
    return value;
  }
}

function sortByGroup(a, b) {
  let value = a.group.id - b.group.id;
  if(value == 0) {
    return sortByTime(a, b);
  }
  else {
    return value;
  }
}

const sortingFunctions = {
  'name': sortByName,
  'group': sortByGroup,
  'time': sortByTime
}

function Header({children, group, bindSort, currentSort}) {
  let className = currentSort == group ? 'active' : '';
  return (
    <th className={className}
      onClick={bindSort(group)}>

      {children}
    </th>
  )
}

export default class TripTable extends Component {
  constructor(props) {
    super(props);
    this.state = this.getNewState(props);
    this.state.sort = 'time';
  }
  componentWillReceiveProps(props) {
    this.setState(this.getNewState(props));
  }
  getNewState({feed, routeId}) {
    let trips = getRoute(feed, routeId).trips;
    if(trips.length == 0) {
      return {
        trips: [],
        globalBounds: null
      }
    }
    trips.forEach(trip => {
      trip.timetable = getTimetable(feed, trip.trip_id);
      trip.service = getService(feed, trip.service_id);
    });
    let bounds = trips.map(trip => getTripBounds(trip.timetable));
    let globalBounds = getFullBounds(bounds);

    let index = 1;
    let groups = {};
    trips.forEach(trip => {
      let stopTimes = trip.timetable.stopTimes;
      let groupId = stopTimes.map(stopTime => stopTime.stop_id).join('\t');
      let destination = getStop(feed, stopTimes[stopTimes.length - 1].stop_id);
      if(groups[groupId] == undefined) {
        groups[groupId] = {
          id: index,
          name: 'To '+destination.stop_name+' ('+stopTimes.length+' stops)'
        };;
        ++index;
      }
      trip.group = groups[groupId];
    });
    this._trips = trips;
    return {
      trips,
      globalBounds
    }
  }
  render() {
    let trips = this.state.trips;
    if(trips.length == 0) {
      return <p>No trips available</p>
    }
    let all = this.state.globalBounds;
    trips.sort(sortingFunctions[this.state.sort]);
    let rows = trips.map((trip, index) => {
      return (
        <TripRow
          key={index}
          index={index}
          all={all}
          {...trip} />
      )
    })

    const bindSort = sort => {
      return _ => this.setState({sort});
    }

    return (
      <table className="trip-table">
        <thead>
          <tr>
            <Header group="group" bindSort={bindSort} currentSort={this.state.sort}>Group</Header>
            <Header group="name" bindSort={bindSort} currentSort={this.state.sort}>Trip</Header>
            <Header group="time" bindSort={bindSort} currentSort={this.state.sort}>Days Active</Header>
            <Header group="time" bindSort={bindSort} currentSort={this.state.sort}>
              Times Covered
              ({formatTime(all.startTime)} - {formatTime(all.endTime)})
            </Header>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}
