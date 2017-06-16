const Handlers = require('./handlers');

module.exports = [{
  method: 'POST',
  path: '/authenticate',
  config: {
    auth: false,
  },
  handler: Handlers.authenticate,
}, {
  method: 'GET',
  path: '/ping',
  handler: Handlers.ping,
}];
