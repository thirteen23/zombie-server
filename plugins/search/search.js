const {node} = require('fluture');

// searchRefineries :: DB -> Future [Refinery]
exports.searchRefineries = (client, searchString) => {
  return node((done) => {
    client.query(`SELECT "locationId", "locationType" FROM locations WHERE "locationType" = 'Refinery' AND lower("locationName") LIKE \'%${searchString}%\'`,
                 (err, res) => {
                   console.log(err, res.rows);
                     done(res.rows)
                 });
  });
};

// searchTerminals :: DB -> Future [Terminal]
exports.searchTerminals = (client, searchString) => {
  return node((done) => {
    client.query(`SELECT "locationId", "locationType" FROM locations WHERE "locationType" = 'Terminal' AND lower("locationName") LIKE \'%${searchString}%\'`,
                 (err, res) => {
                   console.log(err, res.rows);
                   done(res.rows);
                 });
  });
};

// searchSegments :: DB -> Future [Segment]
exports.searchSegments = (client, searchString) => {
  return node((done) => {
    done([]);
  });
};
