const {node, parallel} = require('fluture');
const sqlt = require('sqlt');

const qGetCategories = sqlt(__dirname + '/queries/get_categories.sql');
const qGetProducts = sqlt(__dirname + '/queries/get_products.sql');
const qGetGrades = sqlt(__dirname + '/queries/get_grades.sql');
const qGetProductsByCategory = sqlt(__dirname + '/queries/get_products_by_category.sql');
const qGetGradesByProduct = sqlt(__dirname + '/queries/get_grades_by_product.sql');

const qGetCompanies = sqlt(__dirname + '/queries/get_companies.sql');

// getCategories :: DB -> Future [Category]
const getCategories = (client) => {
  return node((done) => {
    qGetCategories(client, (err, res) => {
      done(err, res.rows);
    });
  });
};

exports.getCategories = getCategories;

// getProducts :: DB -> Future [Product]
exports.getProducts = (client) => {
  return node((done) => {
    qGetProducts(client, (err, res) => {
      done(err, res.rows);
    });
  });
};

// getProductsByCategory :: DB -> Category -> Future [Product]
const getProductsByCategory = (client, category) => {
  return node((done) => {
    qGetProductsByCategory(client, [category.id], (err, res) => {
      done(err, res.rows);
    });
  });
}

// getGrades :: DB -> Future [Grade]
exports.getGrades = (client) => {
  return node((done) => {
    qGetGrades(client, (err, res) => {
      done(err, res.rows);
    });
  });
};

// getGradesByProduct :: DB -> Product -> Future [Grade]
const getGradesByProduct = (client, product) => {
  return node((done) => {
    qGetGradesByProduct(client, [product.id], (err, res) => {
      done(err, res.rows);
    });
  });
}

// getCategoriesProductsGrades :: DB -> Future [Category]
exports.getCategoriesProductsGrades = (client) => {
  return getCategories(client)
    .chain((categories) => {
      return parallel(20, categories.map((category) => {
        return getProductsByCategory(client, category)
          .chain((products) => {
            return parallel(20, products.map((product) => {
              return getGradesByProduct(client, product).map((grades) => {
                return Object.assign({grades}, product)
              });
            }));
          })
          .map((products) => {
            return Object.assign({products}, category);
          });
      }));
    });
};

// getCompanies :: DB -> Future [Company]
exports.getCompanies = (client) => {
  return node((done) => {
    qGetCompanies(client, (err, res) => {
      done(err, res.rows);
    });
  });
};

// getLocationTypes :: DB -> Future [LocationType]
exports.getLocationsTypes = (client) => {
  return node((done) => {
    client.query('SELECT DISTINCT type AS name FROM web.locations', (err, res) => {
      done(err, res.rows);
    });
  });
};

// getTransportTypes :: DB -> Future [TransportType]
exports.getTransportsTypes = (client) => {
  return node((done) => {
    done(null, [{name: 'pipelines'}])
  });
};
