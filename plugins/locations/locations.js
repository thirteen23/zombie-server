const S = require('../../sanctuary');
const {Future, node} = require('fluture');
const {and, concat, curry2, curry3, elem, equals, filter, lift2, lift3, map, mapMaybe, pipe} = S;
const {head, merge} = require('ramda');
const rbush = require('rbush');

const {getRefineries} = require('./refineries');
const {getStations} = require('./stations');
const {getTerminals} = require('./terminals');

const {getPipelines} = require('./pipelines');
const {getSegments} = require('./segments');

// locationBounds :: Location -> Bounds
const locationBounds = (location) => {
  return merge(location, {
    minX: location.latitude - 0.1,
    maxX: location.latitude + 0.1,
    minY: location.longitude - 0.1,
    maxY: location.longitude + 0.1,
  });
};

// segmentBounds :: Segment -> Bounds
const segmentBounds = (segment) => {
  const bounds = merge(segment, {
    minX: Infinity,
    maxX: -Infinity,
    minY: Infinity,
    maxY: -Infinity,
    type: 'segment'
  });
  for (let i = 0; i < segment.coordinates.length; i++) {
    let coordinate = segment.coordinates[i];
    bounds.minX = Math.min(parseFloat(coordinate[1]) - 0.1, bounds.minX);
    bounds.maxX = Math.max(parseFloat(coordinate[1]) + 0.1, bounds.maxX);
    bounds.minY = Math.min(parseFloat(coordinate[0]) - 0.1, bounds.minY);
    bounds.maxY = Math.max(parseFloat(coordinate[0]) + 0.1, bounds.maxX);
  }
  return bounds;
};

// getLocations :: DB -> [Location]
exports.getLocations = (client) => {
  const refineries = getRefineries(client);
  const stations = getStations(client);
  const terminals = getTerminals(client);
  return Future.of(curry3((refineries, stations, terminals) => {
    return concat(refineries, concat(stations, terminals));
  }))
    .ap(refineries)
    .ap(stations)
    .ap(terminals);
}

// getLocation :: DB -> Type -> ID -> Location
const getLocation = curry3((client, type, id) => {
  return node((done) => {
    client.query('SELECT * FROM web.$1 WHERE id = $2', [type, id], (err, res) => {
      done(err, res.rows);
    });
  });
});

exports.getNeighbors = curry3((client, type, id) => {
  // fRefineries :: Future Refineries
  const fRefineries = getRefineries(client);
  // fRefineriesBounds :: Future [Bounds]
  const fRefineriesBounds = map((refineries) => map(locationBounds, refineries), fRefineries);
  // fTerminals :: Future Terminals
  const fTerminals = getTerminals(client);
  // fTerminalsBounds :: Future [Bounds]
  const fTerminalsBounds = map((terminals) => map(locationBounds, terminals), fTerminals);
  // fSegments :: Future Segments
  const fSegments = getSegments(client);
  // fSegmentsBounds :: Future [Bounds]
  const fSegmentsBounds = map((segments) => map(segmentBounds, segments), fSegments);
  // fAllBounds :: Future [Bounds]
  const fAllBounds = lift3(refineries => terminals => segments => {
    return concat(refineries, concat(terminals, segments));
  }, fRefineriesBounds, fTerminalsBounds, fSegmentsBounds);
  // fBounds :: Future Bounds
  const fBounds = map((bounds) => {
    return head(filter((bound) => {
      return and(equals(bound.type, type), equals(bound.id, parseInt(id, 10)));
    }, bounds));
  }, fAllBounds);
  // fRTree :: Future RTree
  const fRTree = map((bounds) => rbush(9).load(bounds), fAllBounds);
  // fNeighbors :: Future Neighbors
  const fNeighbors = lift2(bounds => rtree => {
    return rtree.search(bounds);
  }, fBounds, fRTree);
  return fNeighbors;
});
