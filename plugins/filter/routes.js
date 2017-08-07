const Handlers = require('./handlers');

module.exports = [{
  method: 'GET',
  path: '/filter',
  handler: Handlers.filter,
}, {
  method: 'GET',
  path: '/categories',
  handler: Handlers.categories,
}, {
  method: 'GET',
  path: '/products',
  handler: Handlers.products,
}, {
  method: 'GET',
  path: '/grades',
  handler: Handlers.grades,
}, {
  method: 'GET',
  path: '/companies',
  handler: Handlers.companies,
}, {
  method: 'GET',
  path: '/categories/products/grades',
  handler: Handlers.categoriesProductsGrades
}, {
  method: 'GET',
  path: '/locations/types',
  handler: Handlers.locationsTypes
}, {
  method: 'GET',
  path: '/transports/types',
  handler: Handlers.transportsTypes
}];
