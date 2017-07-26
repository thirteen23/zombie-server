const {node} = require('fluture');
const S = require('../../sanctuary');

const {head, map} = S;

// getStations :: DB -> Future [Station]
exports.getStations = (client) => {
  return node((done) => {
    client.query('SELECT * FROM stations', (err, res) => {
      done(err, res.rows);
    });
  });
};

// getStation :: DB -> Int -> Future Station
exports.getStation = (client, id) => {
  return map(head, node((done) => {
    client.query('SELECT * FROM locations WHERE id = $1', [id], (err, res) => {
      done(err, res.rows);
    });
  }));
};
