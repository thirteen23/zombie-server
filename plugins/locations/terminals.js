const $ = require('sanctuary-def');
const {node} = require('fluture');

// Terminal :: Type
const Refinery = $.RecordType({
  name: $.String,
  latitude: $.FiniteNumber,
  longitude: $.FiniteNumber,
});

// getTerminals :: DB -> Future [Terminal]
exports.getTerminals = (client) => {
  return node((done) => client.lrange('terminal', 0, -1, done));
};

// getTerminal :: DB -> Int -> Future Terminal
exports.getTerminal = (client, id) => {
  return node((done) => client.lindex('terminal', id, done));
};
