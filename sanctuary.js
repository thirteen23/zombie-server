const { create, env } = require('sanctuary');
const { env: flutureEnv } = require('fluture-sanctuary-types');
const Future = require('fluture');

module.exports = create({checkTypes: true, env: env.concat(flutureEnv)});
