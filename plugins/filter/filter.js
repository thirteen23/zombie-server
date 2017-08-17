const {Future, node, parallel} = require('fluture');
const sqlt = require('sqlt');
const {head, is, isEmpty, tail, uniq, uniqBy} = require('ramda');
const S = require('../../sanctuary');
const {concat, curry2, curry3, elem, filter, lift2, map, prop} = S;

const {getRefineries} = require('../locations/refineries');
const {getTerminals} = require('../locations/terminals');
const {getSegments} = require('../locations/segments');

const qGetRefineriesByCompanies = sqlt(__dirname + '/queries/get_refineries_by_companies.sql');
const qGetSegmentsByCompanies = sqlt(__dirname + '/queries/get_segments_by_companies.sql');
const qGetTerminalsByCompanies = sqlt(__dirname + '/queries/get_terminals_by_companies.sql');

const qGetRefineriesByGrades = sqlt(__dirname + '/queries/get_refineries_by_grades.sql');
const qGetSegmentsByGrades = sqlt(__dirname + '/queries/get_segments_by_grades.sql');
const qGetTerminalsByGrades = sqlt(__dirname + '/queries/get_terminals_by_grades.sql');

// intArray :: a -> [Int]
const intArray = (a) => {
  return is(String, a) ? [parseInt(a, 10)] : map(str => parseInt(str, 10), a);
};

// doubles :: [Obj] -> [] -> [Obj]
const doubles = curry2((a, b=[]) => {
  if (isEmpty(tail(a))) return b;
  if (elem(head(a), tail(a))) return doubles(tail(a), concat([head(a)], b));
  return doubles(tail(a), b);
});

// intersection :: [Obj] -> [Obj] -> [Obj]
const intersection = curry2((a, b) => {
  const c = concat(a, b);
  const d = doubles(map(prop('id'), c), []);
  return uniqBy(prop('id'), filter((obj) => {
    return elem(prop('id', obj), d);
  }, c));
});

// getRefineriesByCompanies :: DB -> [Company.id] -> [Refinery]
const getRefineriesByCompanies = (client, c_ids) => {
  return node((done) => {
    return qGetRefineriesByCompanies(client, [intArray(c_ids)], (err, res) => {
      done(err, res.rows);
    });
  });
};

// getSegmentsByCompanies :: DB -> [Company.id] -> [Segment]
const getSegmentsByCompanies = (client, c_ids) => {
  return node((done) => {
    return qGetSegmentsByCompanies(client, [intArray(c_ids)], (err, res) => {
      done(err, res.rows);
    });
  });
}

// getTerminalsByCompanies :: DB -> [Company.id] -> [Terminal]
const getTerminalsByCompanies = (client, c_ids) => {
  return node((done) => {
    return qGetTerminalsByCompanies(client, [intArray(c_ids)], (err, res) => {
      done(err, res.rows);
    });
  });
}

// getRefineriesByGrades :: DB -> [Grade.id] -> [Refinery]
const getRefineriesByGrades = (client, g_ids) => {
  return node((done) => {
    return qGetRefineriesByGrades(client, [intArray(g_ids)], (err, res) => {
      done(err, res.rows);
    });
  });
};

// getSegmentsByGrades :: DB -> [Grade.id] -> [Segment]
const getSegmentsByGrades = (client, g_ids) => {
  return node((done) => {
    return qGetSegmentsByGrades(client, [intArray(g_ids)], (err, res) => {
      done(err, res.rows);
    });
  });
};

// getTerminalsByGrades :: DB -> [Grade.id] -> [Terminal]
const getTerminalsByGrades = (client, g_ids) => {
  return node((done) => {
    return qGetTerminalsByGrades(client, [intArray(g_ids)], (err, res) => {
      done(err, res.rows);
    });
  });
};

// filter :: DB -> [Company.id] -> [Location.type] -> [Grade.id] -> Object
exports.filter = (client, c_ids, l_types, g_ids) => {
  const fCompanyRefineries = c_ids ? getRefineriesByCompanies(client, c_ids) : getRefineries(client);
  const fGradeRefineries = g_ids ? getRefineriesByGrades(client, g_ids) : getRefineries(client);
  const fRefineries = lift2(intersection, fCompanyRefineries, fGradeRefineries);

  const fCompanyTerminals = c_ids ? getTerminalsByCompanies(client, c_ids) : getTerminals(client);
  const fGradeTerminals = g_ids ? getTerminalsByGrades(client, g_ids) : getTerminals(client);
  const fTerminals = lift2(intersection, fCompanyTerminals, fGradeTerminals);

  const fCompanySegments = c_ids ? getSegmentsByCompanies(client, c_ids) : getSegments(client);
  const fGradeSegments = g_ids ? getSegmentsByGrades(client, g_ids) : getSegments(client);
  const fSegments = lift2(intersection, fCompanySegments, fGradeSegments);

  return Future.of(curry3((refineries, terminals, segments) => {
    return {
      refineries,
      terminals,
      segments
    };
  }))
    .ap(fRefineries)
    .ap(fTerminals)
    .ap(fSegments);
};
