import {getIn} from './gtfs/indexing';

export function getAgency(feed, agency_id) {
  let agency = getIn(feed, 'agency', agency_id);
  if(feed.agency.length == 1) {
    agency = feed.agency[0];
  }
  if(agency) {
    return {
      ...agency,
      routes: getIn(feed, 'agency.routes', agency_id)
    }
  }
}

export function getRoute(feed, route_id) {
  let route = getIn(feed, 'routes', route_id);
  if(route) {
    return {
      ...route,
      trips: getIn(feed, 'route.trips', route_id)
    }
  }
}

export function getTrip(feed, trip_id) {
  let trip = getIn(feed, 'trips', trip_id);
  if(trip) {
    return {
      ...trip,
      service: getService(feed, trip.service_id)
    }
  }
}

export function getService(feed, service_id) {
  let service = getIn(feed, 'calendar', service_id);
  if(service) {
    return {
      ...service,
      exceptions: getIn(feed, 'service.exceptions', service_id),
      trips: getIn(feed, 'service.trips', service_id)
    }
  }
}

export function getBlock(feed, block_id) {
  return {
    block_id,
    trips: getIn(feed, 'block.trips', block_id)
  }
}

export function getTimetable(feed, trip_id) {
  return {
    trip_id,
    stopTimes: getIn(feed, 'trip.stopTimes', trip_id).map(s => {
      return {
        ...s,
        stop: getIn(feed, 'stops', s.stop_id)
      }
    }),
    frequencies: getIn(feed, 'trip.frequencies', trip_id)
  }
}

export function getFare(feed, fare_id) {
  let fare = getIn(feed, 'fare_attributes', fare_id);
  if(fare) {
    return {
      ...fare,
      rules: getIn(feed, 'fare.rules', fare_id)
    }
  }
}

export function getZone(feed, zone_id) {
  return {
    zone_id,
    stops: getIn(feed, 'zone.stops', zone_id)
  }
}

export function getStop(feed, stop_id) {
  let stop = getIn(feed, 'stops', stop_id);
  if(stop) {
    return {
      ...stop,
      trips: getIn(feed, 'stop.trips', stop_id)
    }
  }
}

export function getShape(feed, shape_id) {
  return {
    shape_id,
    points: getIn(feed, 'shape.points', shape_id),
    trips: getIn(feed, 'shape.trips', shape_id)
  }
}
