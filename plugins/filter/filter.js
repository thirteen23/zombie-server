const {node} = require('fluture');

exports.getCategories = (client) => {
  return node((done) => {
    client.query('SELECT DISTINCT id, name FROM categories', (err, res) => {
      done(err, res.rows);
    });
  });
};

exports.getProducts = (client) => {
  return node((done) => {
    client.query('SELECT DISTINCT id, name FROM products', (err, res) => {
      done(err, res.rows);
    });
  });
};

exports.getGrades = (client) => {
  return node((done) => {
    client.query('SELECT DISTINCT id, name FROM grades WHERE active IS TRUE', (err, res) => {
      done(err, res.rows);
    });
  });
};

exports.getCompanies = (client) => {
  return node((done) => {
    client.query('SELECT DISTINCT id, name FROM companies', (err, res) => {
      done(err, res.rows);
    });
  });
};

exports.getLocationsTypes = (client) => {
  return node((done) => {
    client.query('SELECT DISTINCT type FROM locations', (err, res) => {
      done(err, res.rows);
    });
  });
};

exports.getTransportsTypes = (client) => {
  return node((done) => {
    done(null, ['Pipeline'])
  });
};
