const {node} = require('fluture');
const S = require('../../sanctuary');
const {curry2, lift2, map} = S;
const sqlt = require('sqlt');
const {aggregateMovements, dateRange} = require('./aggregateMovements');

const qGetPathMovements = sqlt(__dirname + '/queries/get_path_movements.sql');
const qGetPathMovementAggregates = sqlt(__dirname + '/queries/get_path_movement_aggregates.sql');
const qGetPathNominations = sqlt(__dirname + '/queries/get_path_nominations.sql');

const getPathMovements = (client, id, start, end) => {
  return node((done) => {
    qGetPathMovements(client, [id, start, end], (err, res) => done(err, res.rows))
  });
};

const getPathMovementAggregates = (client, id, start, end) => {
  const fMovements = node((done) => {
    qGetPathMovementAggregates(client, [id, start, end], (err, res) => done(err, res.rows))
  });
  const dates = dateRange(start, end);
  return map(movements => aggregateMovements(dates, movements), fMovements);
};

const getPathNominations = (client, id, start, end) => {
  return node((done) => {
    qGetPathNominations(client, [id, start, end], (err, res) => done(err, res.rows))
  });
}

module.exports = {
  getPathMovements,
  getPathMovementAggregates,
  getPathNominations
};
