export const routeTypes = {
  '0': 'Tram',
  '1': 'Subway',
  '2': 'Rail',
  '3': 'Bus',
  '4': 'Ferry',
  '5': 'Cable car',
  '6': 'Gondola',
  '7': 'Funicular',
  '100': 'Railway Service',
  '101': 'High Speed Rail Service',
  '102': 'Long Distance Trains',
  '103': 'Inter Regional Rail Service',
  '104': 'Car Transport Rail Service',
  '105': 'Sleeper Rail Service',
  '106': 'Regional Rail Service',
  '107': 'Tourist Railway Service',
  '108': 'Rail Shuttle (Within Complex)',
  '109': 'Suburban Railway',
  '110': 'Replacement Rail Service',
  '111': 'Special Rail Service',
  '112': 'Lorry Transport Rail Service',
  '113': 'All Rail Services',
  '114': 'Cross-Country Rail Service',
  '115': 'Vehicle Transport Rail Service',
  '116': 'Rack and Pinion Railway',
  '117': 'Additional Rail Service',
  '200': 'Coach Service',
  '201': 'International Coach Service',
  '202': 'National Coach Service',
  '203': 'Shuttle Coach Service',
  '204': 'Regional Coach Service',
  '205': 'Special Coach Service',
  '206': 'Sightseeing Coach Service',
  '207': 'Tourist Coach Service',
  '208': 'Commuter Coach Service',
  '209': 'All Coach Services',
  '300': 'Suburban Railway Service',
  '400': 'Urban Railway Service',
  '401': 'Metro Service',
  '402': 'Underground Service',
  '403': 'Urban Railway Service',
  '404': 'All Urban Railway Services',
  '405': 'Monorail',
  '500': 'Metro Service',
  '600': 'Underground Service',
  '700': 'Bus Service',
  '701': 'Regional Bus Service',
  '702': 'Express Bus Service',
  '703': 'Stopping Bus Service',
  '704': 'Local Bus Service',
  '705': 'Night Bus Service',
  '706': 'Post Bus Service',
  '707': 'Special Needs Bus',
  '708': 'Mobility Bus Service',
  '709': 'Mobility Bus for Registered Disabled',
  '710': 'Sightseeing Bus',
  '711': 'Shuttle Bus',
  '712': 'School Bus',
  '713': 'School and Public Service Bus',
  '714': 'Rail Replacement Bus Service',
  '715': 'Demand and Response Bus Service',
  '716': 'All Bus Services',
  '800': 'Trolleybus Service',
  '900': 'Tram Service',
  '901': 'City Tram Service',
  '902': 'Local Tram Service',
  '903': 'Regional Tram Service',
  '904': 'Sightseeing Tram Service',
  '905': 'Shuttle Tram Service',
  '906': 'All Tram Services',
  '1000': 'Water Transport Service',
  '1001': 'International Car Ferry Service',
  '1002': 'National Car Ferry Service',
  '1003': 'Regional Car Ferry Service',
  '1004': 'Local Car Ferry Service',
  '1005': 'International Passenger Ferry Service',
  '1006': 'National Passenger Ferry Service',
  '1007': 'Regional Passenger Ferry Service',
  '1008': 'Local Passenger Ferry Service',
  '1009': 'Post Boat Service',
  '1010': 'Train Ferry Service',
  '1011': 'Road-Link Ferry Service',
  '1012': 'Airport-Link Ferry Service',
  '1013': 'Car High-Speed Ferry Service',
  '1014': 'Passenger High-Speed Ferry Service',
  '1015': 'Sightseeing Boat Service',
  '1016': 'School Boat',
  '1017': 'Cable-Drawn Boat Service',
  '1018': 'River Bus Service',
  '1019': 'Scheduled Ferry Service',
  '1020': 'Shuttle Ferry Service',
  '1021': 'All Water Transport Services',
  '1100': 'Air Service',
  '1101': 'International Air Service',
  '1102': 'Domestic Air Service',
  '1103': 'Intercontinental Air Service',
  '1104': 'Domestic Scheduled Air Service',
  '1105': 'Shuttle Air Service',
  '1106': 'Intercontinental Charter Air Service',
  '1107': 'International Charter Air Service',
  '1108': 'Round-Trip Charter Air Service',
  '1109': 'Sightseeing Air Service',
  '1110': 'Helicopter Air Service',
  '1111': 'Domestic Charter Air Service',
  '1112': 'Schengen-Area Air Service',
  '1113': 'Airship Service',
  '1114': 'All Air Services',
  '1200': 'Ferry Service',
  '1300': 'Telecabin Service',
  '1301': 'Telecabin Service',
  '1302': 'Cable Car Service',
  '1303': 'Elevator Service',
  '1304': 'Chair Lift Service',
  '1305': 'Drag Lift Service',
  '1306': 'Small Telecabin Service',
  '1307': 'All Telecabin Services',
  '1400': 'Funicular Service',
  '1401': 'Funicular Service',
  '1402': 'All Funicular Service',
  '1500': 'Taxi Service',
  '1501': 'Communal Taxi Service',
  '1502': 'Water Taxi Service',
  '1503': 'Rail Taxi Service',
  '1504': 'Bike Taxi Service',
  '1505': 'Licensed Taxi Service',
  '1506': 'Private Hire Service Vehicle',
  '1507': 'All Taxi Services',
  '1600': 'Self Drive',
  '1601': 'Hire Car',
  '1602': 'Hire Van',
  '1603': 'Hire Motorbike',
  '1604': 'Hire Cycle',
  '1700': 'Miscellaneous Service',
  '1701': 'Cable Car',
  '1702': 'Horse-drawn Carriage'
}

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
  'Station',
  'Exit'
]

export const transferPointTypes = [
  'This is a recommended transfer point',
  'The departing vehicle will wait for the arriving one before departing',
  'This transfer requires a minimum amount of time to transfer',
  'Transfers are not possible between routes at this location'
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
    type: 'time',
    optional: true
  },
  departure_time: {
    name: 'Departure Time',
    type: 'time',
    optional: true
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
  agency_id: {
    name: 'Agency',
    relation: 'agency',
    optional: true
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

export const shapeSchema = {
  shape_id: {
    name: 'ID'
  },
  shape_pt_lat: {
    name: 'Latitude',
    type: 'latitude'
  },
  shape_pt_lon: {
    name: 'Longitude',
    type: 'longitude'
  },
  shape_pt_sequence: {
    name: 'Shape Sequence',
    type: 'uint'
  },
  shape_dist_traveled: {
    name: 'Shape Distance Traveled',
    type: 'float',
    optional: true
  }
}

export const feedInfoSchema = {
  feed_publisher_name: {
    name: 'Publisher Name',
  },
  feed_publisher_url: {
    name: 'Publisher URL',
    type: 'url'
  },
  feed_lang: {
    name: 'Language',
    type: 'language'
  },
  feed_start_date: {
    name: 'Start Date',
    optional: true
  },
  feed_end_date: {
    name: 'End Date',
    optional: true
  },
  feed_version: {
    name: 'Version',
    optional: true
  }
}

export const transferSchema = {
  from_stop_id: {
    name: 'From',
    relation: 'stop'
  },
  to_stop_id: {
    name: 'To',
    relation: 'stop'
  },
  transfer_type: {
    name: 'Transfer Type',
    type: transferPointTypes
  },
  min_transfer_time: {
    name: 'Minimum transfer time',
    optional: true,
    type: 'uint'
  }
}

export const schema = {
  agency: {
    schema: agencySchema
  },
  calendar: {
    schema: calendarSchema
  },
  calendar_dates: {
    schema: calendarDatesSchema,
    optional: true
  },
  fare_attributes: {
    schema: fareAttributesSchema,
    optional: true
  },
  fare_rules: {
    schema: fareRulesSchema,
    optional: true
  },
  feed_info: {
    schema: feedInfoSchema,
    optional: true
  },
  frequencies: {
    schema: frequencySchema,
    optional: true
  },
  routes: {
    schema: routeSchema
  },
  shapes: {
    schema: shapeSchema,
    optional: true
  },
  stops: {
    schema: stopSchema
  },
  stop_times: {
    schema: stopTimeSchema
  },
  trips: {
    schema: tripSchema
  },
  transfers: {
    schema: transferSchema,
    optional: true
  }
}

export function filter(schema, filter) {
  let keys;
  if(Array.isArray(filter)) {
    keys = filter;
  }
  else {
    keys = Object.keys(schema).filter(filter);
  }
  let newSchema = {};
  keys.forEach(key => {
    newSchema[key] = schema[key];
  });
  return newSchema;
}
