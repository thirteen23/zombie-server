const Future = require('fluture');
const S = require('../../sanctuary');
const {searchRefineries, searchTerminals, searchSegments} = require('./search');

const {concat, curry2, lift2} = S;

exports.search = (req, rep) => {
  const {searchString} = req.query;
  const fTerminals = searchTerminals(req.server.pg, searchString);
  const fSegments = searchSegments(req.server.pg, searchString);
  return lift2(curry2((terminals, segments) => {
    return concat(terminals, segments);
  }), fTerminals, fSegments).fork((err) => rep(err), (res) => rep(res));
};
