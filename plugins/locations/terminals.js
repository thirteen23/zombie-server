const {node} = require('fluture');

// getTerminals :: DB -> Future [Terminal]
exports.getTerminals = (client) => {
  return node((done) => {
    client.query('SELECT * FROM terminals', [], (err, res) => {
      done(res.rows);
    });
  });
};

// getTerminal :: DB -> Int -> Future Terminal
exports.getTerminal = (client, id) => {
  return node((done) => {
    client.query('SELECT * FROM terminals WHERE id = $1', [id], (err, res) => {
      done(res.rows);
    });
  });
};
