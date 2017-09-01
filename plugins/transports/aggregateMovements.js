const S = require('../../sanctuary');
const {add, and, assoc, equals, findIndex, head, nth, or, prop, propEq, uniqBy, update} = require('ramda');
const {concat, curry2, filter, map, reduce} = S;
const isBefore = require('date-fns/is_before');
const isSameDay = require('date-fns/is_same_day');
const moment = require('moment');
const twix = require('twix');

// dateRange :: Date -> Date -> [Date]
const dateRange = (start, end) => {
  return map(date => date.toDate(), moment(start).twix(moment(end)).toArray('days'));
};

// aggregateMovements :: [Date] -> [Movements] -> [Aggregates]
const aggregateMovements = (dates, movements) => {
  const grades = map(prop('grade_id'), uniqBy(prop('grade_id'), movements));
  return map((date) => {
    return Object.assign({date},
                         reduce(curry2((obj, grade) => {
                           const f = filter((movement) => {
                             const end = prop('end', movement);
                             return and(
                               or(isSameDay(end, date), isBefore(end, date)),
                               equals(prop('grade_id', movement), grade)
                             );
                           }, movements);
                           const daily = reduce(add, 0, map(prop('volume'), f));
                           return assoc(grade, daily, obj);
                         }), {}, grades)
                        );

  }, dates);
};

module.exports = {
  aggregateMovements,
  dateRange,
};
