export const monthsOfYear = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const daysOfWeek = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
]

export const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

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

export const routeSchema = {
  agency_id: {
    name: 'Agency',
    optional: true,
    relation: 'agency'
  },
  route_id: {
    name: 'ID'
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
    optional: true
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
    name: 'ID'
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
    name: 'ID'
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
    name: 'Service ID'
  },
  date: {
    name: 'Date'
  },
  exception_type: {
    name: 'Type',
    type: {
      1: 'Added',
      2: 'Removed'
    }
  }
}
