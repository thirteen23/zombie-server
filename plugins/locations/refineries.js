const $ = require('sanctuary-def');
const { node } = require('fluture');

// Refinery :: Type
const Refinery = $.RecordType({
  name: $.String,
  latitude: $.FiniteNumber,
  longitude: $.FiniteNumber
});

// getRefineries :: DB -> Future [Refinery]
exports.getRefineries = (client) => {
  return node((done) => client.lrange('refineries', 0, -1, done));
};

// getRefinery :: DB -> Int -> Future Refinery
exports.getRefinery = (client, id) => {
  return node((done) => client.lindex('refineries', id, done));
};
