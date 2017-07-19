const {node} = require('fluture');

// getRefineries :: DB -> Future [Refinery]
exports.getRefineries = (client) => {
  return node((done) => {
    client.query('SELECT * FROM refineries', [], (err, res) => {
      done(res.rows);
    });
  });
};

// getRefinery :: DB -> Int -> Future Refinery
exports.getRefinery = (client, id) => {
  return node((done) => {
    client.query('SELECT * FROM refineries WHERE id = $1', [id], (err, res) => {
      done(res.rows);
    });
  });
};
