const S = require('../../sanctuary');
const {add, and, assoc, equals, findIndex, nth, or, prop, propEq, uniqBy, update} = require('ramda');
const {concat, curry2, filter, map, reduce} = S;
const isBefore = require('date-fns/is_before');
const isSameDay = require('date-fns/is_same_day');
const moment = require('moment');
const twix = require('twix');

// aggregateMovements :: [Movements] -> [Aggregates]
const aggregateMovements = (movements) => {
  return reduce(curry2((aggregates, movement) => {
    const i = findIndex((aggregate) => {
      return and(
        equals(prop('grade_id', aggregate), prop('grade_id', movement)),
        isSameDay(prop('end', aggregate), prop('end', movement))
      );
    })(aggregates);
    if (equals(i, -1)) {
      return concat([movement], aggregates)
    }
    return update(i, assoc('volume',  prop('volume', nth(i, aggregates)) + movement.volume, nth(i, aggregates)), aggregates);
  }), [], movements);
};

// movementGrades :: [Movement] -> [Grades]
const movementGrades = (movements) => {
  return map(prop('grade_id'), uniqBy(prop('grade_id'), movements));
};

// dateRange :: Date -> Date -> [Date]
const dateRange = (start, end) => {
  return map(date => date.toDate(), moment(start).twix(moment(end)).toArray('days'));
};

// groupAggregatesByDate :: [Date] -> [Aggregates] -> [Aggregates]
const groupAggregatesByDate = (dates, aggregates) => {
  return map((date) => {
    return new Array(
      date,
      reduce(curry2((volume, movement) => {
        const end = prop('end', movement);
        if (or(isBefore(end, date), isSameDay(end, date))) return add(volume, prop('volume', movement));
        return volume;
      }), 0, aggregates)
    );
  }, dates);
};

// groupAggregatesByGrade :: [Grade] -> [Date] -> [Aggregates] -> [Aggregates]
const groupAggregatesByGrade = (grades, dates, aggregates) => {
  return reduce(curry2((agg, grade) => {
    return assoc(grade,
                 groupAggregatesByDate(
                   dates,
                   filter(aggregate => equals(prop('grade_id', aggregate), grade), aggregates)
                 ),
                 agg);
  }), {}, grades);

};

module.exports = {
  aggregateMovements,
  dateRange,
  groupAggregatesByGrade,
  movementGrades
};
