const Future = require('fluture');
const { getCategories,
        getProducts,
        getGrades,
        getCategoriesProductsGrades,
        getCompanies,
        getLocationsTypes,
        getTransportsTypes } = require('./filter');

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
