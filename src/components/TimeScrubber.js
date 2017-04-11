import React, {Component} from 'react';
import {parseTime, formatTime, formatDuration} from '../format';
import {snapToInterval, getActualFrequencyBounds} from '../util';

function ScrubberBackground(props) {
  let {segments, percentage, totalDuration} = props;
  let divs = segments.map((segment, i) => {
    let color = 'lightgray';
    if(segment.headway) {
      let strength = Math.max(Math.floor(60 / segment.headway * 255), 255);
      color = 'rgb(0,'+strength+',0)';
    }
    let style = {
      width: (segment.duration / totalDuration * 100)+'%',
      backgroundColor: color
    }
    let description = 'not available';
    if(segment.headway) {
      description = formatTime(segment.start) + ' - ' + formatTime(segment.end) + ' every '+formatDuration(segment.headway);
    }
    return (
      <div key={i} className="segment" title={description} style={style} />
    )
  });
  return <div>{divs}</div>
}

export default class TimeScrubber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 0,
      deltaX: null
    }
    this.scrubberMouseDown = event => {
      event.preventDefault();
      let parentRect = this.refs.scrubber.getBoundingClientRect();
      this.setState({
        deltaX: parentRect.left
      });
      this.mouseMove(event, parentRect.left);
    }
    this.mouseDown = event => {
      event.preventDefault();
      event.stopPropagation();
      let parentRect = this.refs.scrubber.getBoundingClientRect();
      let elementRect = this.refs.thumb.getBoundingClientRect();
      this.setState({
        deltaX: event.pageX - elementRect.left + parentRect.left
      });
    }
    this.mouseMove = (event, deltaX) => {
      let delta = deltaX || this.state.deltaX;
      if(!delta) {
        return;
      }
      let fullWidth = this.refs.scrubber.getBoundingClientRect().width;
      let width = fullWidth - this.refs.thumb.getBoundingClientRect().width;

      let pos = event.pageX - delta;
      let percentage = Math.max(0, Math.min(1.0, pos / width));
      let time = percentage * this.duration + this.startTime;
      let segment = this.segments.find(segment => segment.start <= time && time < segment.end);
      if(segment.headway) {
        if(this.props.exact) {
          time = this.startTime + snapToInterval(time - this.startTime, segment.headway);
        }
        else {
          time = snapToInterval(time, 60);
        }
      }
      else if(time > segment.start + segment.duration / 2) {
        time = segment.end;
      }
      else {
        time = segment.start;
      }
      percentage = Math.max(0, Math.min(1.0, (time - this.startTime) / this.duration));

      this.setState({ percentage: percentage * width / fullWidth });
      this.props.onChange(time);
    }
    this.mouseUp = event => {
      this.setState({ deltaX: null });
    }
    this.calculate(props);
  }
  componentDidMount() {
    window.addEventListener('mouseup', this.mouseUp);
    window.addEventListener('mousemove', this.mouseMove);
  }
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.mouseMove);
    window.removeEventListener('mouseup', this.mouseUp);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.frequencies != this.props.frequencies || nextProps.tripDuration != this.props.tripDuration) {
      this.setState({ percentage: 0 });
      this.calculate(nextProps);
    }
  }
  calculate(props) {
    let {frequencies, tripDuration, percentage} = props;
    let segments = [];
    let startTime = parseTime(frequencies[0].start_time);
    let endTime = frequencies.reduce((lastEnd, f) => {
      let { startTime, endTime } = getActualFrequencyBounds(f);
      if(lastEnd && lastEnd != startTime) {
        // filler segment
        segments.push({
          start: lastEnd,
          end: startTime,
          duration: startTime - lastEnd
        });
      }
      segments.push({
        start: startTime,
        end: endTime,
        headway: f.headway_secs,
        duration: endTime - startTime
      });
      return endTime;
    }, null);
    segments.push({
      start: endTime,
      end: endTime + tripDuration,
      duration: tripDuration
    });
    let duration = endTime - startTime;
    let totalDuration = duration + tripDuration;

    this.startTime = startTime;
    this.endTime = endTime;
    this.segments = segments;
    this.duration = duration;
    this.totalDuration = totalDuration;
  }
  render() {
    let {tripDuration} = this.props;
    let {percentage} = this.state;
    let style = {
      width: (tripDuration / this.totalDuration * 100)+'%',
      left: (percentage * 100)+'%'
    };
    let thumb = <div ref="thumb" className="thumb" style={style} onMouseDown={this.mouseDown} />;
    return (
      <div className="scrubber" onMouseDown={this.scrubberMouseDown}>
        <span className="label">{formatTime(this.startTime)}</span>
        <div ref="scrubber" className="rendered">
          <ScrubberBackground segments={this.segments} totalDuration={this.totalDuration} tripDuration={tripDuration} />
          {thumb}
        </div>
        <span className="label">{formatTime(this.endTime+tripDuration)}</span>
      </div>
    )
  }
}
