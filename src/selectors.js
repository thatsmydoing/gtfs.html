export function getService(feed, service_id) {
  let service = feed.calendar.find(service => service.service_id == service_id);
  if(service) {
    service.exceptions = feed.calendar_dates.filter(i => i.service_id == service_id);
    service.trips = feed.trips.filter(i => i.service_id == service_id);
    return service;
  }
}

export function getBlock(feed, block_id) {
  let block = { block_id };
  block.trips = feed.trips.filter(i => i.block_id == block_id);
  return block;
}

export function getTimetable(feed, trip_id) {
  let timetable = { trip_id };
  timetable.stopTimes = feed.stop_times.filter(i => i.trip_id == trip_id);
  timetable.frequencies = feed.frequencies.filter(i => i.trip_id == trip_id);
  return timetable;
}

export function getFare(feed, fare_id) {
  let fare = feed.fare_attributes.find(i => i.fare_id == fare_id);
  fare.rules = feed.fare_rules.filter(i => i.fare_id == fare_id);
  return fare;
}

export function getZone(feed, zone_id) {
  let zone = { zone_id };
  zone.stops = feed.stops.filter(i => i.zone_id == zone_id);
  return zone;
}
