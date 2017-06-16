const JWT = require('jsonwebtoken');
const {KEY, TOKEN} = require('./index');

exports.authenticate = (req, rep) => {
  rep(JWT.sign({token: TOKEN}, KEY));
};

exports.ping = (req, rep) => {
  rep('pong');
};
