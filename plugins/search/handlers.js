const Future = require('fluture');
const S = require('../../sanctuary');
const {searchRefineries, searchTerminals, searchSegments} = require('./search');

const {concat} = S;

exports.search = (req, rep) => {
  const {searchString} = req.query;
  const refineries = searchRefineries(req.server.pg, searchString);
  const terminals = searchTerminals(req.server.pg, searchString);
  Future.of(refineries => terminals => concat(refineries, terminals))
    .ap(refineries)
    .ap(terminals)
    .fork((err) => rep(err), (res) => rep(res));
};
