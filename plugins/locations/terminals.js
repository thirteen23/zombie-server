const {node} = require('fluture');

// getTerminals :: DB -> Future [Terminal]
exports.getTerminals = (client) => {
  return node((done) => {
    client.query('SELECT * FROM locations WHERE "locationType" = $1', ['Terminal'], (err, res) => {
      done(res.rows);
    });
  });
};

// getTerminal :: DB -> Int -> Future Terminal
exports.getTerminal = (client, id) => {
  return node((done) => {
    client.query('SELECT * FROM locations WHERE "locationType" = $1 AND "locationId" = $2', ['Terminal', id], (err, res) => {
      done(res.rows);
    });
  });
};
