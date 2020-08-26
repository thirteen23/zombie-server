const path = require("path");
const Hapi = require("hapi");
const config = require("config");
const redis = require("redis");
const twilio = require("twilio");
const parse = require("date-fns/parse");
const subHours = require("date-fns/sub_hours");
const addHours = require("date-fns/add_hours");
const pg = require("pg");

// pg.types.setTypeParser(1114, date => addHours(parse(date), 6));
// pg.types.setTypeParser(1082, date => addHours(parse(date), 6));

global.rootDir = path.resolve(__dirname);

module.exports = function(callback) {
  const server = new Hapi.Server();

  server.connection({
    host: "0.0.0.0",
    port: process.env.PORT || 9001,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  const pool = new pg.Pool(config.get("pg"));

  server.decorate("server", "pg", pool);

  server.decorate("server", "redis", redis.createClient(config.get("redis")));

  server.decorate(
    "server",
    "twilio",
    new twilio(config.get("twilio").sid, config.get("twilio").secret)
  );

  server.register([
    require("hapi-auth-jwt2"),
    require("h2o2"),
    {
      register: require("./plugins/auth"),
    },
    {
      register: require("./plugins/bus"),
    },
    {
      register: require("./plugins/locations"),
    },
    {
      register: require("./plugins/transports"),
    },
    {
      register: require("./plugins/search"),
    },
    {
      register: require("./plugins/filter"),
    },
    {
      register: require("./plugins/portfolio"),
    },
  ]);

  callback(null, server);
};
