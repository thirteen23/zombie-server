const Hapi = require('hapi');
const config = require('config');
const redis = require('redis');

module.exports = function(callback) {
  const server = new Hapi.Server();

  server.connection({
    host: '0.0.0.0',
    port: 9001,
    routes: {
      cors: true,
    },
  });

  server.decorate('server', 'redis', redis.createClient(config.get('redis')));

  server.register([
    require('hapi-auth-jwt2'),
    {
      register: require('./plugins/auth'),
    },
    {
      register: require('./plugins/bus'),
    },
    {
      register: require('./plugins/locations'),
    }
  ]);

  callback(null, server);
};
