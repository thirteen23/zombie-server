const Future = require('fluture');
const S = require('../../sanctuary');

const { map } = S;

const { getCategories,
        getProducts,
        getGrades,
        getCategoriesProductsGrades,
        getCompanies,
        getLocationsTypes,
        getTransportsTypes } = require('./filterOptions');

const { filter } = require('./filter');

exports.filter = (req, rep) => {
  filter(req.server.pg, req.query.companies, req.query.l_types, req.query.grades)
    .fork(err => rep(err), res => rep(res));
};

exports.categories = (req, rep) => {
  getCategories(req.server.pg)
    .fork(err => rep(err), res => rep(res));
};

exports.products = (req, rep) => {
  getProducts(req.server.pg)
    .fork(err => rep(err), res => rep(res));
};

exports.grades = (req, rep) => {
  getGrades(req.server.pg)
    .fork(err => rep(err), res => rep(res));
};

exports.categoriesProductsGrades = (req, rep) => {
  getCategoriesProductsGrades(req.server.pg)
    .fork(err => rep(err), res => rep(res));
}

exports.companies = (req, rep) => {
  getCompanies(req.server.pg)
    .fork(err => rep(err), res => rep(res));
};

exports.locationsTypes = (req, rep) => {
  getLocationsTypes(req.server.pg)
    .fork(err => rep(err), res => rep(res));
};

exports.transportsTypes = (req, rep) => {
  getTransportsTypes(req.server.pg)
    .fork(err => rep(err), res => rep(res));
};
