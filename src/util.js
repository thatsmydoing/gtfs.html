import {parseTime} from './format';

export function snapToInterval(time, interval) {
  return Math.floor(time / interval) * interval;
}

export function getFullBounds(bounds) {
  return bounds.reduce((acc, curr) => {
    return {
      startTime: Math.min(acc.startTime, curr.startTime),
      endTime: Math.max(acc.endTime, curr.endTime)
    }
  });
}

export function getTripBounds({stopTimes, frequencies}) {
  if(frequencies.length > 0) {
    let duration = parseTime(stopTimes[stopTimes.length - 1].arrival_time) - parseTime(stopTimes[0].departure_time);
    let bounds = frequencies.map(getActualFrequencyBounds);
    let result = getFullBounds(bounds);
    result.endTime += duration;
    return result;
  }
  else {
    return {
      startTime: parseTime(stopTimes[0].departure_time),
      endTime: parseTime(stopTimes[stopTimes.length - 1].arrival_time)
    }
  }
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
