const {concat} = require('sanctuary');
const Future = require('fluture');
const {searchRefineries, searchTerminals, searchSegments} = require('./search');

exports.search = (req, rep) => {
  const {searchString} = req.query;
  const refineries = searchRefineries(req.server.pg, searchString);
  const terminals = searchTerminals(req.server.pg, searchString);
  Future.of(refineries => terminals => refineries.concat(terminals))
    .ap(refineries)
    .ap(terminals)
    .fork((err) => rep(err), (res) => rep(res));
};
