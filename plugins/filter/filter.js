const {Future, node, parallel} = require('fluture');
const sqlt = require('sqlt');
const {equals, head, is, isEmpty, isNil, or, tail, uniq, uniqBy} = require('ramda');
const S = require('../../sanctuary');
const {concat, curry2, curry3, curry4, elem, filter, lift2, map, pipe, prop} = S;

const qGetRefineries = sqlt(__dirname + '/queries/get_refineries.sql');
const qGetSegments = sqlt(__dirname + '/queries/get_segments.sql');
const qGetTerminals = sqlt(__dirname + '/queries/get_terminals.sql');
const qGetStations = sqlt(__dirname + '/queries/get_stations.sql');

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

// trampoline
const trampoline = (f) => {
  while (f && f instanceof Function) {
    f = f.apply(f.context, f.args);
  }
  return f;
}

// doubles :: [Int] -> [Int]
const doubles = (a) => {
  const _doubles = (acc, a) => {
    if (isEmpty(tail(a))) return acc;
    if (elem(head(a), tail(a))) return _doubles.bind(null, concat([head(a)], acc), tail(a));
    return _doubles.bind(null, acc, tail(a));
  };
  return trampoline(_doubles.bind(null, [], a));
}

// intersection :: [Obj] -> [Obj] -> [Int]
const intersection = curry2((a, b) => {
  return pipe([
    map(prop('id')),
    doubles,
    uniq
  ])(concat(a, b));
});

// getRefineries :: DB -> [Refinery]
const getRefineries = (client) => {
  return node((done) => {
    return qGetRefineries(client, (err, res) => {
      done(err, res.rows);
    });
  });
}

// getSegments :: DB -> [Segment]
const getSegments = (client) => {
  return node((done) => {
    return qGetSegments(client, (err, res) => {
      done(err, res.rows);
    });
  });
}

// getTerminals :: DB -> [Terminal]
const getTerminals = (client) => {
  return node((done) => {
    return qGetTerminals(client, (err, res) => {
      done(err, res.rows);
    });
  });
}

// getStations :: DB -> [Station]
const getStations = (client) => {
  return node((done) => {
    return qGetStations(client, (err, res) => {
      done(err, res.rows);
    });
  });
}

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

// inTypes :: String -> ? -> Boolean
const inTypes = (type, types) => {
  if (isNil(types)) return true;
  if (is(String, types) && equals(type, types)) return true;
  if (is(String, types)) return false;
  if (elem(type, types)) return true;
};

// filter :: DB -> [Company.id] -> [Location.type] -> [Grade.id] -> Object
exports.filter = (client, c_ids, l_types, g_ids) => {
  const fCompanyRefineries = c_ids ? getRefineriesByCompanies(client, c_ids) : getRefineries(client);
  const fGradeRefineries = g_ids ? getRefineriesByGrades(client, g_ids) : getRefineries(client);
  const fRefineries = inTypes('refinery', l_types) ?
          lift2(intersection, fCompanyRefineries, fGradeRefineries)
          : Future.of([]);

  const fCompanyTerminals = c_ids ? getTerminalsByCompanies(client, c_ids) : getTerminals(client);
  const fGradeTerminals = g_ids ? getTerminalsByGrades(client, g_ids) : getTerminals(client);
  const fTerminals = inTypes('terminal', l_types) ?
          lift2(intersection, fCompanyTerminals, fGradeTerminals)
          : Future.of([]);

  const fCompanySegments = c_ids ? getSegmentsByCompanies(client, c_ids) : getSegments(client);
  const fGradeSegments = g_ids ? getSegmentsByGrades(client, g_ids) : getSegments(client);
  const fSegments = lift2(intersection, fCompanySegments, fGradeSegments);

  const fStations = inTypes('station', l_types) ?
          map((stations) => map(prop('id'), stations), getStations(client))
          : Future.of([]);

  return Future.of(curry4((refineries, terminals, segments, stations) => {
    return {
      refineries,
      terminals,
      segments,
      stations
    };
  }))
    .ap(fRefineries)
    .ap(fTerminals)
    .ap(fSegments)
    .ap(fStations);
};
