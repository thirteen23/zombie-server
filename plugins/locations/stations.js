const {node} = require('fluture');
const sqlt = require('sqlt');
const S = require('../../sanctuary');
const {map} = S;
const {head} = require('ramda');

qGetStations = sqlt(__dirname + '/queries/get_stations.sql');

// getStations :: DB -> Future [Station]
exports.getStations = (client) => {
  return node((done) => {
    qGetStations(client, (err, res) => {
      done(err, res.rows);
    });
  });
};

// getStation :: DB -> Int -> Future Station
exports.getStation = (client, id) => {
  return map(head, node((done) => {
    client.query('SELECT * FROM web.stations WHERE id = $1', [id], (err, res) => {
      done(err, res.rows);
    });
  }));
};
