const {node} = require('fluture');
const S = require('../../sanctuary');
const {curry2, lift2, map} = S;
const sqlt = require('sqlt');
const {aggregateMovements, dateRange, groupAggregatesByGrade, movementGrades} = require('./aggregateMovements');

const qGetPathMovements = sqlt(__dirname + '/queries/get_path_movements.sql');
const qGetPathMovementAggregates = sqlt(__dirname + '/queries/get_path_movement_aggregates.sql');

const getPathMovements = (client, id, start, end) => {
  return node((done) => {
    qGetPathMovements(client, [id, start, end], (err, res) => done(err, res.rows))
  });
};

const getPathMovementAggregates = (client, id, start, end) => {
  const fMovements = node((done) => {
    qGetPathMovementAggregates(client, [id, start, end], (err, res) => done(err, res.rows))
  });
  const fAggregatedMovements = map(aggregateMovements, fMovements);
  const fGrades = map(movementGrades, fMovements);
  const dates = dateRange(start, end);
  return lift2(curry2((grades, aggregates) => {
    return groupAggregatesByGrade(grades, dates, aggregates);
  }), fGrades, fAggregatedMovements);
};

module.exports = {
  getPathMovements,
  getPathMovementAggregates
};
