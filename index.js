const Hapi = require('hapi');

const KEY = 'Itisknownthatgeometryassumes,asthingsgiven,boththenotionofspaceandthefirstprinciplesofconstructionsinspace';
const TOKEN = 'Thedevelopmentofmathematicsinthedirectionofgreaterexactnesshasledtolargetractsofitbecomingformalized';

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
    require('hapi-auth-jwt2'),
    {
      register: require('./plugins/auth'),
    },
    {
      register: require('./plugins/bus'),
    },
  ]);

  callback(null, server);
};
