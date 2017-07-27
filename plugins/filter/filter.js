const {node} = require('fluture');

exports.getCategories = (client) => {
  return node((done) => {
    client.query('SELECT DISTINCT * FROM web.categories', (err, res) => {
      done(err, res.rows);
    });
  });
};

exports.getProducts = (client) => {
  return node((done) => {
    client.query('SELECT DISTINCT * FROM web.products', (err, res) => {
      done(err, res.rows);
    });
  });
};

exports.getGrades = (client) => {
  return node((done) => {
    client.query('SELECT * FROM web.grades WHERE active IS TRUE', (err, res) => {
      done(err, res.rows);
    });
  });
};

exports.getCompanies = (client) => {
  return node((done) => {
    client.query('SELECT * FROM web.companies ORDER BY name', (err, res) => {
      done(err, res.rows);
    });
  });
};

exports.getLocationsTypes = (client) => {
  return node((done) => {
    client.query('SELECT DISTINCT type AS name FROM web.locations', (err, res) => {
      done(err, res.rows);
    });
  });
};

exports.getTransportsTypes = (client) => {
  return node((done) => {
    done(null, ['Pipeline'])
  });
};
