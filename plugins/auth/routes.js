const Handlers = require('./handlers');

module.exports = [{
  method: 'POST',
  path: '/authenticate',
  handler: Handlers.authenticate,
}];
