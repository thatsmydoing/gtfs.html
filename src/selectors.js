export function getService(feed, service_id) {
  let service = feed.calendar.find(service => service.service_id == service_id);
  if(service) {
    service.exceptions = feed.calendar_dates.filter(i => i.service_id == service_id);
    return service;
  }
}
