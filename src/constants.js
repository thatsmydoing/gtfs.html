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
