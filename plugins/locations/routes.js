const Handlers = require('./handlers');

module.exports = [{
  method: 'GET',
  path: '/locations',
  handler: Handlers.getLocations,
}, {
  method: 'GET',
  path: '/refineries',
  handler: Handlers.getRefineries,
}, {
  method: 'GET',
  path: '/refineries/{id}',
  handler: Handlers.getRefinery,
}, {
  method: 'GET',
  path: '/terminals',
  handler: Handlers.getTerminals,
}, {
  method: 'GET',
  path: '/terminals/{id}',
  handler: Handlers.getTerminal,
}, {
  method: 'GET',
  path: '/pipelines',
  handler: Handlers.getPipelines,
}, {
  method: 'GET',
  path: '/pipelines/{id}',
  handler: Handlers.getPipeline,
}, {
  method: 'GET',
  path: '/locations/{type}/{id}/neighbors',
  handler: Handlers.getNeighbors,
}];
