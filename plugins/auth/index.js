const path = require('path');
const S = require(rootDir + '/sanctuary');

const { toMaybe } = S;

const KEY = 'Itisknownthatgeometryassumes,asthingsgiven,boththenotionofspaceandthefirstprinciplesofconstructionsinspace';

exports.KEY = KEY;

exports.register = (server, options, next) => {
  server.auth.strategy('jwt', 'jwt', true, {
    key: KEY,
    validateFunc: (decoded, req, cb) => {
      req.server.redis.get(decoded.uuid, (err, val) => {
        cb(err, toMaybe(val).isJust);
      });
    },
    verifyOptions: {algorithms: ['HS256']},
  });
  server.route(require('./routes'));
  next();
};

exports.register.attributes = {name: 'auth'};
