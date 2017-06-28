const JWT = require('jsonwebtoken');
const uuidv1 = require('uuid/v1');
const {parallel} = require('fluture');
const Boom = require('boom');
const {KEY} = require('./index');
const {setCode, sendCode, verifyCode} = require('./auth');

exports.authenticate = (req, rep) => {
  const uuid = uuidv1();
  const {identifier} = req.payload;
  const code = Math.ceil(Math.random() * (Math.floor(9999) - (Math.ceil(0))));
  parallel(2, [setCode(req.server.redis, uuid, code), sendCode(req.server.twilio, identifier, code)])
    .fork((err) => rep(err), (res) => rep(uuid));
};

exports.verify = (req, rep) => {
  const {uuid, code} = req.payload;
  const verification = verifyCode(req.server.redis, uuid, code);
  verification.fork((err) => rep(err), (res) => {
    res ? rep(JWT.sign({uuid}, KEY)) : rep(Boom.unauthorized('No matching session and code found.'));
  });
};

exports.ping = (req, rep) => {
  rep('pong');
};
