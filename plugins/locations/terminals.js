const {node} = require('fluture');
const S = require('../../sanctuary');

const {head, map} = S;

// getTerminals :: DB -> Future [Terminal]
exports.getTerminals = (client) => {
  return node((done) => {
    client.query('SELECT * FROM locations WHERE "locationType" = $1', ['Terminal'], (err, res) => {
      done(err, res.rows);
    });
  });
};

// getTerminal :: DB -> Int -> Future Terminal
exports.getTerminal = (client, id) => {
  return map(head, node((done) => {
    client.query('SELECT * FROM locations WHERE "locationType" = $1 AND "locationId" = $2', ['Terminal', id], (err, res) => {
      done(err, res.rows);
    });
  }));
};
