const Future = require('fluture');
const S = require('../../sanctuary');
const { getTerminalsInventory,
        getTerminalsForecastInventory } = require('./terminals');

exports.getTerminalsInventory = (req, rep) => {
  return getTerminalsInventory(req.server.pg, req.query.start, req.query.end)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getTerminalsForecastInventory = (req, rep) => {
  return getTerminalsForecastInventory(req.server.pg, req.query.start, req.query.end)
    .fork((err) => rep(err), (res) => rep(res));
};
