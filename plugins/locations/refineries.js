const {node} = require('fluture');
const S = require('../../sanctuary.js');
const {head, map} = S;

// getRefineries :: DB -> Future [Refinery]
exports.getRefineries = (client) => {
  return node((done) => {
    client.query('SELECT * FROM refineries', (err, res) => {
      done(err, res.rows);
    });
  });
};

// getRefinery :: DB -> Int -> Future Refinery
exports.getRefinery = (client, id) => {
  return map(head, node((done) => {
    client.query('SELECT * FROM refineries WHERE id = $1', [id], (err, res) => {
      done(err, res.rows);
    });
  }));
};
