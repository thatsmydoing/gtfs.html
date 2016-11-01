import React, {Component} from 'react';
import {stopTimeSchema, pickupTypes, dropOffTypes} from '../constants';
import {formatTime, parseTime} from '../format';
import {filterSchema, renderEntries} from './InfoTable';
import TimeScrubber from './TimeScrubber';

const displaySchema = filterSchema(stopTimeSchema, [
  'stop_id',
  'arrival_time',
  'departure_time',
  'stop_headsign',
  'timepoint'
])

function SimpleTimetable({stopTimes}) {
  let headers = Object.keys(displaySchema).map(key => <th key={key}>{displaySchema[key].name}</th>);
  let entries = stopTimes.map((stopTime, index) => {
    let restrictions = [];
    if(stopTime.pickup_type > 0) {
      restrictions.push(
        <span key="p" className="restriction" title={pickupTypes[stopTime.pickup_type]}>
          P{stopTime.pickup_type}
        </span>
      );
    }
    if(stopTime.drop_off_type > 0) {
      if(restrictions.length > 0) {
        restrictions.push(', ');
      }
      restrictions.push(
        <span key="d" className="restriction" title={dropOffTypes[stopTime.drop_off_type]}>
          D{stopTime.drop_off_type}
        </span>
      );
    }
    let entries = renderEntries(stopTime, displaySchema, 'td');
    return (
      <tr key={index}>
        {entries}
        <td>{restrictions}</td>
      </tr>
    )
  });
  return (
    <table>
      <thead>
        <tr>
          {headers}
          <th>Restrictions</th>
        </tr>
      </thead>
      <tbody>
        {entries}
      </tbody>
    </table>
  )
}

export default class Timetable extends Component {
  constructor(props) {
    super(props);
    var self = this;
    this.state = {
      time: null
    }
    this.change = time => {
      self.setState({time});
    }
  }
  render() {
    let {stopTimes, frequencies} = this.props;
    let hasFrequencies = frequencies.length > 0;
    let exact = frequencies.some(f => f.exact_times == 1);
    let startTime = parseTime(stopTimes[0].departure_time);
    let endTime = parseTime(stopTimes[stopTimes.length - 1].arrival_time);

    let scrubber = null;
    if(hasFrequencies) {
      scrubber = (
        <TimeScrubber
          frequencies={frequencies}
          tripDuration={endTime - startTime}
          exact={exact}
          onChange={this.change} />
      )
      let time = this.state.time || parseTime(frequencies[0].start_time);
      function offset(t) {
        return formatTime(time + parseTime(t) - startTime);
      }
      stopTimes = stopTimes.map(stopTime => {
        return {
          ...stopTime,
          arrival_time: offset(stopTime.arrival_time),
          departure_time: offset(stopTime.departure_time)
        }
      });
    }
    return (
      <div>
        <h3>Timetable</h3>
        {scrubber}
        <SimpleTimetable stopTimes={stopTimes} />
      </div>
    )
  }
}
