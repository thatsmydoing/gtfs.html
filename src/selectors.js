import {getIn} from './gtfs/indexing';

export function getRoute(feed, route_id) {
  let route = getIn(feed, 'routes', route_id);
  if(route) {
    route.trips = getIn(feed, 'route.trips', route_id);
    return route;
  }
}

export function getTrip(feed, trip_id) {
  let trip = getIn(feed, 'trips', trip_id);
  if(trip) {
    trip.service = getService(feed, trip.service_id);
    return trip;
  }
}

export function getService(feed, service_id) {
  let service = getIn(feed, 'calendar', service_id);
  if(service) {
    service.exceptions = getIn(feed, 'service.exceptions', service_id);
    service.trips = getIn(feed, 'service.trips', service_id);
    return service;
  }
}

export function getBlock(feed, block_id) {
  let block = { block_id };
  block.trips = getIn(feed, 'block.trips', block_id);
  return block;
}

export function getTimetable(feed, trip_id) {
  let timetable = { trip_id };
  timetable.stopTimes = getIn(feed, 'trip.stopTimes', trip_id);
  timetable.frequencies = getIn(feed, 'trip.frequencies', trip_id);
  return timetable;
}

export function getFare(feed, fare_id) {
  let fare = getIn(feed, 'fare_attributes', fare_id);
  fare.rules = getIn(feed, 'fare.rules', fare_id);
  return fare;
}

export function getZone(feed, zone_id) {
  let zone = { zone_id };
  zone.stops = getIn(feed, 'zone.stops', zone_id);
  return zone;
}
