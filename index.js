const Hapi = require('hapi');

module.exports = function(callback) {
  const server = new Hapi.Server();

  server.connection({
    host: '0.0.0.0',
    port: 9001,
    routes: {
      cors: true,
    },
  });

  server.register([
    {
      register: require('./plugins/auth'),
    },
    {
      register: require('./plugins/bus'),
    },
  ]);

  callback(null, server);
};
