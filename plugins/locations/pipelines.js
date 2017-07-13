const {node} = require('fluture');
const {objToArray} = require('./utils');

// getPipelines :: DB -> Future [Pipeline]
exports.getPipelines = (client) => {
  return node((done) => client.hgetall('pipelines', (err, res) => done(objToArray(res))));
};

// getPipeline :: DB -> Int -> Future Pipeline
exports.getPipeline = (client, id) => {
  return node((done) => client.hget('pipelines', id, (err, res) => done(JSON.parse(res))));
};
