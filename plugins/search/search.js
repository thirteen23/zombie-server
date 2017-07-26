const {node} = require('fluture');

// searchRefineries :: DB -> Future [Refinery]
exports.searchRefineries = (client, searchString) => {
  return node((done) => {
    client.query(`SELECT * FROM refineries WHERE lower(name) LIKE \'%${searchString.toLowerCase()}%\'`,
                 (err, res) => {
                   done(err, res.rows);
                 });
  });
};

// searchTerminals :: DB -> Future [Terminal]
exports.searchTerminals = (client, searchString) => {
  return node((done) => {
    client.query(`SELECT * FROM terminals WHERE lower(name) LIKE \'%${searchString.toLowerCase()}%\'`,
                 (err, res) => {
                   done(err, res.rows);
                 });
  });
};

// searchSegments :: DB -> Future [Segment]
exports.searchSegments = (client, searchString) => {
  return node((done) => {
    done(null, []);
  });
};
