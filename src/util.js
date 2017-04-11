import {parseTime} from './format';

export function snapToInterval(time, interval) {
  return Math.floor(time / interval) * interval;
}

export function getActualFrequencyBounds(frequency) {
  let startTime = parseTime(frequency.start_time);
  let endTime = parseTime(frequency.end_time);
  if(frequency.exact_times == 1) {
    let diff = endTime - startTime;
    let exactEnd = startTime + snapToInterval(diff, frequency.headway_secs);
    if(exactEnd == endTime) {
      endTime = exactEnd - frequency.headway_secs;
    }
    else {
      endTime = exactEnd;
    }
  }
  return { startTime, endTime };
}
