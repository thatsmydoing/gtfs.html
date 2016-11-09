export const routeTypes = [
  'Tram',
  'Subway',
  'Rail',
  'Bus',
  'Ferry',
  'Cable car',
  'Gondola',
  'Funicular'
]

export const directionTypes = [
  'Forward',
  'Backward'
]

export const wheelchairTypes = [
  'No information',
  'At least one wheelchair accomodation',
  'No wheelchair accomodations'
]

export const bikeTypes = [
  'No information',
  'At least one bicycle accomodation',
  'No bicycle accomodations'
]

export const pickupTypes = [
  'Regularly scheduled pickup',
  'No pickup available',
  'Must phone agency to arrange pickup',
  'Must coordinate with driver to arrange pickup'
]

export const dropOffTypes = [
  'Regularly scheduled drop off',
  'No drop off available',
  'Must phone agency to arrange drop off',
  'Must coordinate with driver to arrange drop off'
]

export const paymentMethodTypes = [
  'Fare is paid on board',
  'Fare must be paid before boarding'
]

export const transferTypes = {
  0: 'No transfers permitted',
  1: 'One transfer',
  2: 'Two transfers',
  '': 'Unlimited transfers'
}

export const locationTypes = [
  'Stop',
  'Station'
]

export const routeSchema = {
  agency_id: {
    name: 'Agency',
    optional: true,
    relation: 'agency'
  },
  route_id: {
    name: 'ID',
    pk: true
  },
  route_short_name: {
    name: 'Short Name',
    optional: true
  },
  route_long_name: {
    name: 'Long Name',
    optional: true
  },
  route_desc: {
    name: 'Description',
    optional: true
  },
  route_url: {
    name: 'URL',
    optional: true,
    type: 'url'
  },
  route_type: {
    name: 'Type',
    type: routeTypes
  },
  route_color: {
    name: 'Color',
    optional: true,
    type: 'color'
  },
  route_text_color: {
    name: 'Text Color',
    optional: true,
    type: 'color'
  }
}

export const agencySchema = {
  agency_id: {
    name: 'ID',
    optional: true,
    pk: true
  },
  agency_name: {
    name: 'Name'
  },
  agency_url: {
    name: 'URL',
    type: 'url'
  },
  agency_timezone: {
    name: 'Timezone',
    type: 'timezone'
  },
  agency_lang: {
    name: 'Language',
    optional: true,
    type: 'language',
  },
  agency_phone: {
    name: 'Phone',
    optional: true
  },
  agency_fare_url: {
    name: 'Fare URL',
    optional: true,
    type: 'url'
  },
  agency_email: {
    name: 'Email',
    optional: true,
    type: 'email'
  }
}

export const tripSchema = {
  route_id: {
    name: 'Route',
    relation: 'route'
  },
  service_id: {
    name: 'Service Schedule',
    relation: 'service'
  },
  trip_id: {
    name: 'ID',
    pk: true
  },
  trip_headsign: {
    name: 'Headsign',
    optional: true
  },
  trip_short_name: {
    name: 'Short Name',
    optional: true
  },
  direction_id: {
    name: 'Direction',
    optional: true,
    type: directionTypes
  },
  block_id: {
    name: 'Block',
    optional: true,
    relation: 'block'
  },
  shape_id: {
    name: 'Shape',
    optional: true,
    relation: 'shape'
  },
  wheelchair_accessible: {
    name: 'Wheelchair Accessibility',
    optional: true,
    type: wheelchairTypes
  },
  bikes_allowed: {
    name: 'Bikes Allowed',
    optional: true,
    type: bikeTypes
  }
}

export const calendarSchema = {
  service_id: {
    name: 'ID',
    pk: true
  },
  monday: {
    name: 'Monday',
    type: 'boolean'
  },
  tuesday: {
    name: 'Tuesday',
    type: 'boolean'
  },
  wednesday: {
    name: 'Wednesday',
    type: 'boolean'
  },
  thursday: {
    name: 'Thursday',
    type: 'boolean'
  },
  friday: {
    name: 'Friday',
    type: 'boolean'
  },
  saturday: {
    name: 'Saturday',
    type: 'boolean'
  },
  sunday: {
    name: 'Sunday',
    type: 'boolean'
  },
  start_date: {
    name: 'Start Date',
    type: 'date'
  },
  end_date: {
    name: 'End Date',
    type: 'date'
  }
}

export const calendarDatesSchema = {
  service_id: {
    name: 'Service ID',
    relation: 'calendar'
  },
  date: {
    name: 'Date',
    type: 'date'
  },
  exception_type: {
    name: 'Type',
    type: {
      1: 'Added',
      2: 'Removed'
    }
  }
}

export const stopTimeSchema = {
  trip_id: {
    name: 'Trip',
    relation: 'trip'
  },
  arrival_time: {
    name: 'Arrival Time',
    type: 'time'
  },
  departure_time: {
    name: 'Departure Time',
    type: 'time'
  },
  stop_id: {
    name: 'Stop',
    relation: 'stop'
  },
  stop_sequence: {
    name: 'Stop Sequence',
    type: 'uint'
  },
  stop_headsign: {
    name: 'Headsign',
    optional: true
  },
  pickup_type: {
    name: 'Pickup Type',
    type: pickupTypes,
    optional: true
  },
  drop_off_type: {
    name: 'Drop Off Type',
    type: dropOffTypes,
    optional: true
  },
  shape_dist_traveled: {
    name: 'Shape Distance Traveled',
    type: 'float',
    optional: true
  },
  timepoint: {
    name: 'Timepoint',
    type: 'boolean',
    default: 1,
    optional: true
  }
}

export const frequencySchema = {
  trip_id: {
    name: 'Trip',
    relation: 'trip'
  },
  start_time: {
    name: 'Start Time',
    type: 'time'
  },
  end_time: {
    name: 'End Time',
    type: 'time'
  },
  headway_secs: {
    name: 'Headway',
    type: 'uint'
  },
  exact_times: {
    name: 'Exact times',
    type: 'boolean',
    optional: true
  }
}

export const fareRulesSchema = {
  fare_id: {
    name: 'ID'
  },
  route_id: {
    name: 'Route',
    relation: 'route',
    optional: true
  },
  origin_id: {
    name: 'Origin',
    relation: 'zone',
    optional: true
  },
  destination_id: {
    name: 'Destination',
    relation: 'zone',
    optional: true
  },
  contains_id: {
    name: 'Contains',
    relation: 'zone',
    optional: true
  }
}

export const fareAttributesSchema = {
  fare_id: {
    name: 'ID',
    pk: true
  },
  price: {
    name: 'Price',
    type: 'float'
  },
  currency_type: {
    name: 'Currency',
    type: 'currency'
  },
  payment_method: {
    name: 'Payment Method',
    type: paymentMethodTypes
  },
  transfers: {
    name: 'Transfers',
    type: transferTypes
  },
  transfer_duration: {
    name: 'Transfer Duration',
    type: 'uint',
    optional: true
  }
}

export const stopSchema = {
  stop_id: {
    name: 'ID',
    pk: true
  },
  stop_code: {
    name: 'Code',
    optional: true
  },
  stop_name: {
    name: 'Name',
  },
  stop_desc: {
    name: 'Description',
    optional: true
  },
  stop_lat: {
    name: 'Latitude',
    type: 'latitude'
  },
  stop_lon: {
    name: 'Longitude',
    type: 'longitude'
  },
  zone_id: {
    name: 'Zone',
    optional: true,
    relation: 'zone'
  },
  stop_url: {
    name: 'URL',
    optional: true,
    type: 'url'
  },
  location_type: {
    name: 'Location Type',
    optional: true,
    type: locationTypes
  },
  parent_station: {
    name: 'Parent Station',
    optional: true,
    relation: 'stop'
  },
  stop_timezone: {
    name: 'Timezone',
    optional: true,
    type: 'timezone'
  },
  wheelchair_boarding: {
    name: 'Wheelchair Accessibility',
    optional: true,
    type: wheelchairTypes
  }
}

export const schema = {
  agency: agencySchema,
  calendar: calendarSchema,
  calendar_dates: calendarDatesSchema,
  fare_attributes: fareAttributesSchema,
  fare_rules: fareRulesSchema,
  frequencies: frequencySchema,
  routes: routeSchema,
  shapes: {}, // TODO
  stops: stopSchema,
  stop_times: stopTimeSchema,
  trips: tripSchema
}

export function fields(schema) {
  return Object.keys(schema);
}

export function filter(schema, filter) {
  let keys;
  if(Array.isArray(filter)) {
    keys = filter;
  }
  else {
    keys = fields(schema).filter(filter);
  }
  let newSchema = {};
  keys.forEach(key => {
    newSchema[key] = schema[key];
  });
  return newSchema;
}
