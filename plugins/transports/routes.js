const Handlers = require('./handlers');

module.exports = [{
  method: 'GET',
  path: '/segments/{id}/grades',
  handler: Handlers.getSegmentGrades,
}, {
  method: 'GET',
  path: '/segments/{id}/paths',
  handler: Handlers.getSegmentPaths,
}, {
  method: 'GET',
  path: '/segments/{id}/nomination_periods',
  handler: Handlers.getSegmentNominationPeriods,
}, {
  method: 'GET',
  path: '/segments/{id}/nominations',
  handler: Handlers.getSegmentNominations,
}, {
  method: 'GET',
  path: '/segments/{id}/movements',
  handler: Handlers.getSegmentMovements,
}, {
  method: 'GET',
  path: '/segments/{id}/movements/aggregates',
  handler: Handlers.getSegmentMovementAggregates,
}, {
  method: 'GET',
  path: '/paths/{id}/movements',
  handler: Handlers.getPathMovements,
}, {
  method: 'GET',
  path: '/paths/{id}/movements/aggregates',
  handler: Handlers.getPathMovementAggregates,
}];
