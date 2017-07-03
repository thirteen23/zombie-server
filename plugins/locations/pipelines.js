const $ = require('sanctuary-def');
const {node} = require('fluture');

// getRefineries :: DB -> Future [Pipeline]
exports.getPipelines = (client) => {
  return node((done) => client.lrange('pipelines', 0, -1, done));
};

// getRefinery :: DB -> Int -> Future Pipeline
exports.getPipeline = (client, id) => {
  return node((done) => client.lindex('pipelines', id, done));
};
