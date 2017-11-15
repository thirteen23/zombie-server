const Handlers = require('./handlers');

module.exports = [{
  method: 'GET',
  path: '/terminals/inventory',
  handler: Handlers.getTerminalsInventory,
}, {
  method: 'GET',
  path: '/terminals/forecasts/inventory',
  handler: Handlers.getTerminalsForecastInventory
}, {
  method: 'POST',
  path: '/terminals/forecasts/edits',
  handler: {
    proxy: {
      passThrough: true,
      host: '127.0.0.1',
      port: '5000',
      protocol: 'http'
    }
  }
}, {
  method: 'GET',
  path: '/portfolio/grades',
  handler: Handlers.getPortfolioGrades
}, {
  method: 'GET',
  path: '/nominations/periods',
  handler: Handlers.getNominationPeriods
}];
