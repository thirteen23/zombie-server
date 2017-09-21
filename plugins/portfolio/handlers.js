const Future = require('fluture');
const S = require('../../sanctuary');
const { getTerminalsInventory,
        getTerminalsForecastInventory } = require('./terminals');
const { getPortfolioGrades } = require('./portfolio');
const { getNominationPeriods } = require('./nominations');

exports.getTerminalsInventory = (req, rep) => {
  return getTerminalsInventory(req.server.pg, req.query.grade, req.query.terminals, req.query.start, req.query.end)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getTerminalsForecastInventory = (req, rep) => {
  return getTerminalsForecastInventory(req.server.pg, req.query.grade, req.query.terminals, req.query.start, req.query.end)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getPortfolioGrades = (req, rep) => {
  return getPortfolioGrades(req.server.pg, req.query.refineries, req.query.segments, req.query.terminals)
    .fork(err => rep(err), res => rep(res));
};

exports.getNominationPeriods = (req, rep) => {
  return getNominationPeriods(req.server.pg)
    .fork(err => rep(err), res => rep(res));
};
