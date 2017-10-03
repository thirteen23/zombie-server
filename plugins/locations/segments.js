const {node} = require('fluture');
const S = require('../../sanctuary');
const {assoc, head} = require('ramda');
const sqlt = require('sqlt');
const {map} = S;

const qGetSegments = sqlt(__dirname + '/queries/get_segments.sql');

// pointsToArray :: Object -> Array
const pointsToArray = ({x, y}) => {
  return [y, x];
};

// coordsToCoords :: Object -> Object
const coordsToCoords = (segment) => {
  return map((seg) => {
    const coordinates = new Array();
    for (let i = 0; i < seg.coordinates.length; i++) {
      coordinates.push(pointsToArray(seg.coordinates[i]));
    }
    return assoc('coordinates', coordinates, seg);
  }, segment);
};

// getSegments :: DB -> Future [Segment]
exports.getSegments = (client) => {
  return node((done) => {
    qGetSegments(client, (err, res) => {
      done(err, res.rows);
    });
  });
};

// getSegment :: DB -> Int -> Future Segment
exports.getSegment = (client, id) => {
  return map(head, node((done) => {
    client.query('SELECT * FROM web.segments WHERE id = $1', [id], (err, res) => {
      done(err, res.rows);
    });
  }));
};
