const {node} = require('fluture');
const S = require('../../sanctuary');
const sqlt = require('sqlt');

const { head, map } = S;

const qGetPipelines = sqlt(__dirname + '/queries/get_pipelines.sql');

// getPipelines :: DB -> Future [Pipeline]
exports.getPipelines = (client) => {
  return node((done) => {
    qGetPipelines(client, [], (err, res) => {
      done(err, res.rows);
    });
  });
};

// getPipeline :: DB -> Int -> Future Pipeline
exports.getPipeline = (client, id) => {
  return map(head, node((done) => {
    client.query('SELECT * FROM web.pipelines WHERE id = $1', [id], (err, res) => {
      done(err, res.rows);
    });
  }));
};
