const Handlers = require('./handlers');

module.exports = [{
  method: 'POST',
  path: '/authenticate',
  config: {
    auth: false,
  },
  handler: Handlers.authenticate,
}, {
  method: 'POST',
  path: '/verify',
  config: {
    auth: false,
  },
  handler: Handlers.verify,
}, {
  method: 'GET',
  path: '/ping',
  handler: Handlers.ping,
}];
