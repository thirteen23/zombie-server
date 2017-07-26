const {node} = require('fluture');
const S = require('../../sanctuary');

const {head, map} = S;

// getTerminals :: DB -> Future [Terminal]
exports.getTerminals = (client) => {
  return node((done) => {
    client.query('SELECT * FROM terminals', (err, res) => {
      done(err, res.rows);
    });
  });
};

// getTerminal :: DB -> Int -> Future Terminal
exports.getTerminal = (client, id) => {
  return map(head, node((done) => {
    client.query('SELECT * FROM terminals WHERE id = $1', [id], (err, res) => {
      done(err, res.rows);
    });
  }));
};
