const S = require('sanctuary');

const KEY = 'Itisknownthatgeometryassumes,asthingsgiven,boththenotionofspaceandthefirstprinciplesofconstructionsinspace';
const TOKEN = 'Thedevelopmentofmathematicsinthedirectionofgreaterexactnesshasledtolargetractsofitbecomingformalized';

exports.KEY = KEY;
exports.TOKEN = TOKEN;

exports.register = (server, options, next) => {
  server.auth.strategy('jwt', 'jwt', true, {
    key: KEY,
    validateFunc: (decoded, request, callback) => {
      callback(null, S.equals(decoded.token, TOKEN));
    },
    verifyOptions: { algorithms: ['HS256'] }
  });
  server.route(require('./routes'));
  next();
};

exports.register.attributes = { name: 'auth' };
