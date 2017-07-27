const {node} = require('fluture');
const S = require('../../sanctuary');

const {head, map} = S;

// getSegments :: DB -> Future [Segment]
exports.getSegments = (client) => {
  return node((done) => {
    client.query('SELECT * FROM web.segments', (err, res) => {
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
