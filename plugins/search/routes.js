const Handlers = require('./handlers');

module.exports = [{
  method: 'GET',
  path: '/search',
  handler: Handlers.search,
}];
