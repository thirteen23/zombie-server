const {node} = require('fluture');
const {objToArray} = require('./utils');

// getRefineries :: DB -> Future [Refinery]
exports.getRefineries = (client) => {
  return node((done) => client.hgetall('refineries', (err, res) => done(objToArray(res))));
};

// getRefinery :: DB -> Int -> Future Refinery
exports.getRefinery = (client, id) => {
  return node((done) => client.hget('refineries', id, (err, res) => done(JSON.parse(res))));
};
