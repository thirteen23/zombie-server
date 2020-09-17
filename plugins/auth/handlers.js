const JWT = require("jsonwebtoken");
const uuidv1 = require("uuid/v1");
const { parallel } = require("fluture");
const Boom = require("boom");
const S = require("../../sanctuary");
const { alt, equals, find, map, maybeToNullable, pipe, prop, Nothing } = S;

const { KEY } = require("./index");
const { setCode, sendCode, verifyCode } = require("./auth");

const users = [
  {
    username: "joe.lene",
    password: "magicshow",
  },
  {
    username: "doug.cook@thirteen23.com",
    password: "magicshow",
  },
];

// findName :: String -> Maybe String
const findName = (name, password) => {
  return users.find(
    user => user.username === name && user.password === password
  );
  // return find(
  //   user => equals(user.username, name) && equals(user.password, password),
  //   users
  // );
};

// lookUp :: String -> Maybe String
const lookUp = pipe([findName, map(prop("phone"))]);

exports.authenticate = (req, rep) => {
  const uuid = uuidv1();
  const { identifier, password } = req.payload;
  const code = 0; //Math.ceil(Math.random() * (Math.floor(9999) - (Math.ceil(0))));
  if (findName(identifier, password)) {
    rep(uuid);
  } else {
    rep(Boom.unauthorized("Username and password combo not found."));
  }

  // rep(uuid);
  // parallel(1, [setCode(req.server.redis, uuid, code)]).fork(
  //   err => rep(err),
  //   res => rep(uuid)
  // );
};

exports.verify = (req, rep) => {
  const { uuid, code } = req.payload;
  const verification = verifyCode(req.server.redis, uuid, code);
  verification.fork(
    err => rep(err),
    res => {
      res
        ? rep(JWT.sign({ uuid }, KEY))
        : rep(Boom.unauthorized("No matching session and code found."));
    }
  );
};

exports.ping = (req, rep) => {
  rep("pong");
};

exports.spoof = (req, rep) => {
  const uuid = uuidv1();
  setCode(req.server.redis, uuid, 9999).fork(
    err => rep(err),
    res => rep(JWT.sign({ uuid }, KEY))
  );
};
