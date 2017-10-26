const {Future} = require('fluture');
const {getNeighbors} = require('./locations');
const {getRefineries, getRefinery} = require('./refineries');
const { getTerminals,
        getTerminal,
        getTerminalMovements,
        getTerminalRundowns,
        getTerminalForecastRundowns,
        getTerminalInventory,
        getTerminalOverages,
        getTerminalShortages } = require('./terminals');
const {getSegments, getSegment} = require('./segments');
const {getPipelines, getPipeline} = require('./pipelines');
const {getStations, getStation} = require('./stations');

const S = require('../../sanctuary');
const { concat, curry2, lift2 } = S;

exports.getLocations = (req, rep) => {
  const refineries = getRefineries(req.server.pg);
  const terminals = getTerminals(req.server.pg);
  Future.of((refineries) => (terminals) => {
    return {refineries, terminals};
  })
    .ap(refineries)
    .ap(terminals)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getRefineries = (req, rep) => {
  getRefineries(req.server.pg)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getRefinery = (req, rep) => {
  getRefinery(req.server.pg, req.params.id)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getTerminals = (req, rep) => {
  getTerminals(req.server.pg)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getTerminal = (req, rep) => {
  getTerminal(req.server.pg, req.params.id)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getTerminalMovements = (req, rep) => {
  getTerminalMovements(req.server.pg, req.params.t_id, req.params.g_id, req.query.start, req.query.end)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getTerminalRundowns = (req, rep) => {
  getTerminalRundowns(req.server.pg, req.params.t_id, req.params.g_id, req.query.start, req.query.end)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getTerminalForecastRundowns = (req, rep) => {
  getTerminalForecastRundowns(req.server.pg, req.params.t_id, req.params.g_id, req.query.start, req.query.end)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getTerminalInventory = (req, rep) => {
  getTerminalInventory(req.server.pg, req.params.t_id, req.params.g_id, req.query.day)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getTerminalOverages = (req, rep) => {
  getTerminalOverages(req.server.pg, req.params.t_id, req.query.start, req.query.end)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getTerminalShortages = (req, rep) => {
  getTerminalShortages(req.server.pg, req.params.t_id, req.query.start, req.query.end)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getPipelines = (req, rep) => {
  getPipelines(req.server.pg)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getPipeline = (req, rep) => {
  getPipeline(req.server.pg, req.params.id)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getSegments = (req, rep) => {
  getSegments(req.server.pg)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getSegment = (req, rep) => {
  getSegment(req.server.pg, req.params.id)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getStations = (req, rep) => {
  getStations(req.server.pg)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getStation = (req, rep) => {
  getStation(req.server.pg, req.params.id)
    .fork((err) => rep(err), (res) => rep(res));
};

exports.getNeighbors = (req, rep) => {
  getNeighbors(req.server.pg, req.params.type, req.params.id)
    .fork((err) => rep(err), (res) => rep(res));
};
