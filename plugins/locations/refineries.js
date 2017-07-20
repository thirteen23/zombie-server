const {node} = require('fluture');

// getRefineries :: DB -> Future [Refinery]
exports.getRefineries = (client) => {
  return node((done) => {
    client.query('SELECT * FROM locations WHERE "locationType" = $1', ['Refinery'], (err, res) => {
      done(res.rows);
    });
  });
};

// getRefinery :: DB -> Int -> Future Refinery
exports.getRefinery = (client, id) => {
  return node((done) => {
    client.query('SELECT * FROM locations WHERE "locationType" = $1 AND "locationId" = $2', ['Refinery', id], (err, res) => {
      done(res.rows);
    });
  });
};
