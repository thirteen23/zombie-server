const {concat} = require('sanctuary');
const {parallel} = require('fluture');
const {searchRefineries, searchTerminals, searchSegments} = require('./search');

exports.search = (req, rep) => {
  const {searchString} = req.query;
  parallel(2, [searchRefineries(req.server.pg, searchString), searchTerminals(req.server.pg, searchString)])
    .fork((err) => rep(err), (res) => rep(res));
};
