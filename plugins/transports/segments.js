const {node} = require('fluture');
const S = require('../../sanctuary');
const sqlt = require('sqlt');
const {curry2, lift2, map} = S;

const {aggregateMovements, dateRange, groupAggregatesByGrade, movementGrades} = require('./aggregateMovements');

const qGetSegmentGrades = sqlt(__dirname + '/queries/get_segment_grades.sql');
const qGetSegmentPaths = sqlt(__dirname + '/queries/get_segment_paths.sql');
const qGetSegmentNominationPeriods = sqlt(__dirname + '/queries/get_segment_nomination_periods.sql');
const qGetSegmentNominations = sqlt(__dirname + '/queries/get_segment_nominations.sql');
const qGetSegmentMovements = sqlt(__dirname + '/queries/get_segment_movements.sql');
const qGetSegmentMovementAggregates = sqlt(__dirname + '/queries/get_segment_movement_aggregates.sql');

// getSegmentGrades :: DB -> Int -> Future [Grade]
const getSegmentGrades = (client, id) => {
  return node((done) => {
    qGetSegmentGrades(client, [id], (err, res) => done(err, res.rows))
  });
};

// getSegmentPaths :: DB -> Int -> Future [Path]
const getSegmentPaths = (client, id) => {
  return node((done) => {
    qGetSegmentPaths(client, [id], (err, res) => done(err, res.rows))
  });
};

// getSegmentNominationPeriods :: DB -> Int -> Future [Nomination Period]
const getSegmentNominationPeriods = (client, id) => {
  return node((done) => {
    qGetSegmentNominationPeriods(client, [id], (err, res) => done(err, res.rows))
  });
};

// getSegmentNominations :: DB -> Int -> Date -> Date -> Future [Nomination]
const getSegmentNominations = (client, id, start, end) => {
  return node((done) => {
    qGetSegmentNominations(client, [id, start, end], (err, res) => done(err, res.rows))
  });
};

// getSegmentMovements :: DB -> Int -> Date -> Date -> Future [Movement]
const getSegmentMovements = (client, id, start, end) => {
  return node((done) => {
    qGetSegmentMovements(client, [id, start, end], (err, res) => done(err, res.rows))
  });
};

// getSegmentMovementAggregates :: DB -> Int -> Date -> Date -> Future [Aggregates]
const getSegmentMovementAggregates = (client, id, start, end) => {
  const fMovements = node((done) => {
    qGetSegmentMovementAggregates(client, [id, start, end], (err, res) => done(err, res.rows))
  });
  const fAggregatedMovements = map(aggregateMovements, fMovements);
  const fGrades = map(movementGrades, fMovements);
  const dates = dateRange(start, end);
  return lift2(curry2((grades, aggregates) => {
    return groupAggregatesByGrade(grades, dates, aggregates);
  }), fGrades, fAggregatedMovements);
};

module.exports = {
  getSegmentGrades,
  getSegmentPaths,
  getSegmentNominationPeriods,
  getSegmentNominations,
  getSegmentMovements,
  getSegmentMovementAggregates
};
