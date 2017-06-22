const { Future } = require('fluture');
const { getRefineries, getRefinery } = require('./refineries');
const { getTerminals, getTerminal } = require('./terminals');

exports.getLocations = (req, rep) => {
  const refineries = getRefineries(req.server.redis);
  const terminals = getTerminals(req.server.redis);
  Future.of(refineries => terminals => {
    return { refineries, terminals };
  })
    .ap(refineries)
    .ap(terminals)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getRefineries = (req, rep) => {
  getRefineries(req.server.redis)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getRefinery = (req, rep) => {
  getRefinery(req.server.redis, req.params.id)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getTerminals = (req, rep) => {
  getTerminals(req.server.redis)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getTerminal = (req, rep) => {
  getTerminal(req.server.redis, req.params.id)
    .fork((err) => rep(err), (res) => rep(res));
};
