const Future = require('fluture');
const S = require('../../sanctuary');
const {searchRefineries, searchTerminals, searchSegments} = require('./search');

const {concat} = S;

exports.search = (req, rep) => {
  const {searchString} = req.query;
  const terminals = searchTerminals(req.server.pg, searchString)
    .fork((err) => rep(err), (res) => rep(res));
};
