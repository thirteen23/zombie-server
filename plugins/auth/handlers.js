const JWT = require('jsonwebtoken');
const uuidv1 = require('uuid/v1');
const { both } = require('fluture');
const { KEY, TOKEN } = require('./index');
const { setCode, sendCode, verifyCode } = require('./auth');

exports.authenticate = (req, rep) => {
  const uuid = uuidv1();
  const { phone } = req.payload;
  const code = Math.ceil(Math.random() * (Math.floor(9999) - (Math.ceil(0))));
  both(setCode(req.server.redis, uuid, code), sendCode(req.server.twilio, phone, code))
    .fork((err) => rep(err), (res) => rep(uuid));
};

exports.verify = (req, rep) => {
  const { uuid, code } = req.payload;
  const verification = verifyCode(req.server.redis, uuid, code);
  verification.fork((err) => rep(err), (res) => rep(JWT.sign({uuid}, KEY)));
};

exports.ping = (req, rep) => {
  rep('pong');
};
