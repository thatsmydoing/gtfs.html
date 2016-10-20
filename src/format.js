export function parseDate(date) {
  let year = date.substr(0, 4);
  let month = date.substr(4, 2);
  let day = date.substr(6, 2);
  return new Date(year, month-1, day);
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
