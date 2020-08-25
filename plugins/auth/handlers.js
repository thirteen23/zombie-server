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
    username: "anthonyshull",
    phone: "12159090921",
  },
  {
    username: "maxwade",
    phone: "18179294543",
  },
  {
    username: "tomhudson",
    phone: "15126572608",
  },
  {
    username: "dougcook",
    phone: "15129647984",
  },
  {
    username: "lanideguire",
    phone: "15126892628",
  },
  {
    username: "davidgreenberg",
    phone: "13106141287",
  },
  {
    username: "davidcorthorn",
    phone: "61450208022",
  },
  {
    username: "morgangerber",
    phone: "16306218096",
  },
  {
    username: "lauralevisay",
    phone: "12545923703",
  },
  {
    username: "alexchandy",
    phone: "12813522263",
  },
];

// findName :: String -> Maybe String
const findName = name => {
  return find(user => equals(user.username, name), users);
};

// lookUp :: String -> Maybe String
const lookUp = pipe([findName, map(prop("phone"))]);

exports.authenticate = (req, rep) => {
  const uuid = uuidv1();
  const { identifier } = req.payload;
  const code = 0; //Math.ceil(Math.random() * (Math.floor(9999) - (Math.ceil(0))));
  rep(uuid);
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
