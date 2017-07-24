const {node} = require('fluture');
const S = require('../../sanctuary');

const {head, map} = S;

// getPipelines :: DB -> Future [Pipeline]
exports.getPipelines = (client) => {
  return node((done) => {
    client.query('SELECT * FROM pipelines', [], (err, res) => {
      done(err, res.rows);
    });
  });
};

// getPipeline :: DB -> Int -> Future Pipeline
exports.getPipeline = (client, id) => {
  return map(head, node((done) => {
    client.query('SELECT * FROM pipelines WHERE id = $1', [id], (err, res) => {
      done(err, res.rows);
    });
  }));
};
