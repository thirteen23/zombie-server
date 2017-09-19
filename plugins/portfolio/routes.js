const Handlers = require('./handlers');

module.exports = [{
  method: 'GET',
  path: '/terminals/inventory',
  handler: Handlers.getTerminalsInventory,
}, {
  method: 'GET',
  path: '/terminals/forecasts/inventory',
  handler: Handlers.getTerminalsForecastInventory
}];
