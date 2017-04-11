import {daysOfWeek} from './constants';

export function parseDate(date) {
  let year = date.substr(0, 4);
  let month = date.substr(4, 2);
  let day = date.substr(6, 2);
  return new Date(year, month-1, day);
}

export function parseTime(time) {
  let result = /(\d+):(\d+):(\d+)/.exec(time);
  if(result == null) {
    return undefined;
  }
  let [, h, m, s] = result;
  return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s);
}

export function formatTime(time) {
  let h = Math.floor(time / 3600);
  let m = Math.floor(time % 3600 / 60);
  let s = Math.floor(time % 60);
  return pad(h, 2)+':'+pad(m, 2)+':'+pad(s, 2);
}

export function formatDuration(duration) {
  if(duration > 3600) {
    let h = duration / 3600;
    return h+'h'+formatDuration(duration % 3600);
  }
  else if(duration > 60) {
    let m = duration / 60;
    return m+'m'+formatDuration(duration % 60);
  }
  else if(duration > 0) {
    return duration+'s';
  }
  else {
    return '';
  }
}

export function pad(num, length, pad = '0') {
  let result = num + '';
  if(result.length < length) {
    for(let i = 0; i < length - result.length; ++i) {
      result = pad + result;
    }
  }
  return result;
}

export function formatDaysOfWeek(service) {
  function format(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)+'s';
  }

  let days = daysOfWeek.filter(dow => service[dow] == 1)
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
  return dows;
}
