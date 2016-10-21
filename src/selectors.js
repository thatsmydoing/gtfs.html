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
