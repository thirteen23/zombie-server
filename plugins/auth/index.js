const S = require("../../sanctuary");

const { toMaybe } = S;

const KEY =
  "Itisknownthatgeometryassumes,asthingsgiven,boththenotionofspaceandthefirstprinciplesofconstructionsinspace";

exports.KEY = KEY;

exports.register = (server, options, next) => {
  server.auth.strategy("jwt", "jwt", true, {
    key: KEY,
    validateFunc: (decoded, req, cb) => {
      cb(null, true);
    },
    verifyOptions: { algorithms: ["HS256"] },
  });
  server.route(require("./routes"));
  next();
};

exports.register.attributes = { name: "auth" };
