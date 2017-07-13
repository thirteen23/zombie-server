const S = require('../../sanctuary');
const {Future, node} = require('fluture');
const {map, curry3, lift2, pipe} = S;
const rbush = require('rbush');

const {getTerminals} = require('./terminals');
const {getRefineries} = require('./refineries');
const {getPipelines} = require('./pipelines');

// bounds :: Location -> Bounds
const bounds = ({latitude, longitude}) => {
  return {
    minX: latitude - 0.5,
    maxX: latitude + 0.5,
    minY: longitude - 0.5,
    maxY: longitude + 0.5
  };
};

// prepTree :: JSON -> RTree
const prepTree = pipe([JSON.parse, (rtree) => rbush(9).fromJSON(rtree)]);

exports.getNeighbors = curry3((client, type, id) => {
  // location :: Future Location
  const location = map(JSON.parse,
                       node((done) => client.hget(type, id, done)));
  // fBounds :: Future Bounds
  const fBounds = map(bounds, location);
  // fRTree :: Future RTree
  const fRTree = map(prepTree,
                     node((done) => client.get('rtree', done)));
  // neighbors :: Future Neighbors
  const neighbors = lift2(bounds => rtree => {
    return rtree.search(bounds);
  }, fBounds, fRTree);

  return neighbors;
});
