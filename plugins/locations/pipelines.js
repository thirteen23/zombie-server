const {node} = require('fluture');
const {objToArray} = require('./utils');

// getPipelines :: DB -> Future [Pipeline]
exports.getPipelines = (client) => {
  return node((done) => {
    client.query('SELECT * FROM pipelines', [], (err, res) => {
      done(res.rows);
    });
  });
};

// getPipeline :: DB -> Int -> Future Pipeline
exports.getPipeline = (client, id) => {
  return node((done) => {
    client.query('SELECT * FROM pipelines WHERE id = $1', [id], (err, res) => {
      done(res.rows);
    });
  });
};
