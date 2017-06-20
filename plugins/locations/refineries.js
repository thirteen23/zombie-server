const $ = require('sanctuary-def');
const { node } = require('fluture');

// Refinery :: Type
const Refinery = $.RecordType({
  name: $.String,
  latitude: $.FiniteNumber,
  longitude: $.FiniteNumber
});

// getRefineries :: DB -> Future {Refineries}
exports.getRefineries = (client) => {
  return node((done) => client.hgetall('refineries', done));
}

// getRefinery :: DB -> String -> Future Refinery
exports.getRefinery = (client, id) => {
  return node((done) => client.hget('refineries', id, done));
}
