const { Future } = require('fluture');
const { getSegmentGrades,
        getSegmentPaths,
        getSegmentNominationPeriods,
        getSegmentNominations,
        getSegmentMovements,
        getSegmentMovementAggregates } = require('./segments');

const { getPathMovements,
        getPathMovementAggregates } = require('./paths');

exports.getSegmentGrades = (req, rep) => {
  getSegmentGrades(req.server.pg, req.params.id)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getSegmentPaths = (req, rep) => {
  getSegmentPaths(req.server.pg, req.params.id)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getSegmentNominationPeriods = (req, rep) => {
  getSegmentNominationPeriods(req.server.pg, req.params.id)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getSegmentNominations = (req, rep) => {
  getSegmentNominations(req.server.pg, req.params.id, req.query.start, req.query.end)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getSegmentMovements = (req, rep) => {
  getSegmentMovements(req.server.pg, req.params.id, req.query.start, req.query.end)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getSegmentMovementAggregates = (req, rep) => {
  getSegmentMovementAggregates(req.server.pg, req.params.id, req.query.start, req.query.end)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getPathMovements = (req, rep) => {
  getPathMovements(req.server.pg, req.params.id, req.query.start, req.query.end)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getPathMovementAggregates = (req, rep) => {
  getPathMovementAggregates(req.server.pg, req.params.id, req.query.start, req.query.end)
    .fork((err) => rep(err), (res) => rep(res));
};
