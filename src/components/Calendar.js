import React, {Component} from 'react';
import {monthsOfYear, daysPerMonth} from '../constants';

function isLeapYear(year) {
  return year % 400 == 0 || (year % 4 == 0 && year % 100 != 0)
}

function Box(props) {
  let className = 'box '+props.className;
  return <td className={className}>{props.day}</td>
}

function Month(props) {
  let date = new Date(props.year, props.month, 1);
  let offset = date.getDay();
  let days = daysPerMonth[props.month];
  if(props.month == 1 && isLeapYear(props.year)) {
    ++days;
  }

  let numRows = Math.floor((offset + days + 6) / 7);
  let rows = [];
  for(let i = 0; i < numRows; ++i) {
    let boxes = [];
    let o = i * 7 - offset + 1;
    for(let j = 0; j < 7; ++j) {
      let d = o + j;
      if(d <= 0 || d > days) {
        boxes.push(<Box key={j} className='empty' />);
      }
      else {
        let type = props.classNameFor(j, props.year, props.month, d);
        boxes.push(<Box key={j} className={type} day={d} />);
      }
    }
    rows.push(<tr key={i}>{boxes}</tr>);
  }
  return (
    <div className="month">
      <h1>{monthsOfYear[props.month]}</h1>
      <table>
        <thead>
          <tr>
            <th>Su</th>
            <th>Mo</th>
            <th>Tu</th>
            <th>We</th>
            <th>Th</th>
            <th>Fr</th>
            <th>Sa</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: new Date().getFullYear()
    }
  }
  setYear(year) {
    this.setState({year});
  }

  render() {
    const start = _ => this.setYear(this.props.startYear);
    const end = _ => this.setYear(this.props.endYear);
    const now = _ => this.setYear(new Date().getFullYear());
    const prev = _ => this.setYear(this.state.year - 1);
    const next = _ => this.setYear(this.state.year + 1);

    let months = [];
    for(var i = 0; i < 12; ++i) {
      months.push(
        <Month
          key={i}
          year={this.state.year}
          month={i}
          classNameFor={this.props.classNameFor} />
      );
    }
    return (
      <div className="calendar">
        <div className="controls">
          <button onClick={start}>Start</button>
          <button onClick={prev}>Prev</button>
          <button onClick={now}>{this.state.year}</button>
          <button onClick={next}>Next</button>
          <button onClick={end}>End</button>
        </div>
        {months}
      </div>
    )
  }
}
