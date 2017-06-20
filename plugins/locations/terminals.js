const $ = require('sanctuary-def');
const { node } = require('fluture');

// Terminal :: Type
const Refinery = $.RecordType({
  name: $.String,
  latitude: $.FiniteNumber,
  longitude: $.FiniteNumber
});

// getTerminals :: DB -> Future {Terminals}
exports.getTerminals = (client) => {
  return node((done) => client.hgetall('terminals', done));
}

// getTerminal :: DB -> String -> Future Terminal
exports.getTerminal = (client, id) => {
  return node((done) => client.hget('terminals', id, done));
}
