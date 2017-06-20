const Handlers = require('./handlers');

module.exports = [{
  method: 'GET',
  path: '/locations',
  handler: Handlers.getLocations
}, {
  method: 'GET',
  path: '/refineries',
  handler: Handlers.getRefineries
}, {
  method: 'GET',
  path: '/refineries/{id}',
  handler: Handlers.getRefinery
}, {
  method: 'GET',
  path: '/terminals',
  handler: Handlers.getTerminals
}, {
  method: 'GET',
  path: '/terminals/{id}',
  handler: Handlers.getTerminal
}];
