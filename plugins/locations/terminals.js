const {node} = require('fluture');
const {objToArray} = require('./utils');

// getTerminals :: DB -> Future [Terminal]
exports.getTerminals = (client) => {
  return node((done) => client.hgetall('terminals', (err, res) => done(objToArray(res))));
};

// getTerminal :: DB -> Int -> Future Terminal
exports.getTerminal = (client, id) => {
  return node((done) => client.hget('terminals', id, (err, res) => done(JSON.parse(res))));
};
