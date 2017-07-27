const S = require('../../sanctuary');
const {Future, node} = require('fluture');
const {map, elem, curry2, curry3, lift2, pipe} = S;
const rbush = require('rbush');

const {getRefineries} = require('./refineries');
const {getStations} = require('./stations');
const {getTerminals} = require('./terminals');

const {getPipelines} = require('./pipelines');
const {getSegments} = require('./segments');

// locationBounds :: Location -> Bounds
const bounds = ({id, type, latitude, longitude}) => {
  return {
    minX: latitude - 0.5,
    maxX: latitude + 0.5,
    minY: longitude - 0.5,
    maxY: longitude + 0.5,
    id,
    type
  };
};

// segmentBounds :: Segment -> Bounds
const segmentBounds = ({id, type, coordinates}) => {
  const bounds = {
    minX: Infinity,
    maxX: -Infinity,
    minY: Infinity,
    maxY: -Infinity,
    id,
    type
  };
  for (let i = 0; i < coordinates.length; i++) {
    let coordinate = coordinates[i];
    for (let j = 0; j < coordinate.length; j++) {
      let coord = coordinate[j];
      bounds.minX = Math.min(coord[0], bounds.minX);
      bounds.maxX = Math.min(coord[0], bounds.maxX);
      bounds.minY = Math.min(coord[1], bounds.minY);
      bounds.maxY = Math.min(coord[1], bounds.maxX);
    }
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
  // fTerminals :: Future Terminals
  const fTerminals = getTerminals(client);
  // fSegments :: Future Segments
  const fSegments = getSegments(client);
  // neighbors :: Future Neighbors
  const neighbors = lift2(bounds => rtree => {
    return rtree.search(bounds);
  }, fBounds, fRTree);

  return neighbors;
});
