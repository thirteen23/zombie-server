const {node, parallel} = require('fluture');
const sqlt = require('sqlt');
const {is} = require('ramda');

const qGetRefineriesByCompanies = sqlt(__dirname + '/queries/get_refineries_by_companies.sql');
const qGetSegmentsByCompanies = sqlt(__dirname + '/queries/get_segments_by_companies.sql');
const qGetTerminalsByCompanies = sqlt(__dirname + '/queries/get_terminals_by_companies.sql');

const qGetRefineriesByGrades = sqlt(__dirname + '/queries/get_refineries_by_grades.sql');
const qGetSegmentsByGrades = sqlt(__dirname + '/queries/get_segments_by_grades.sql');
const qGetTerminalsByGrades = sqlt(__dirname + '/queries/get_terminals_by_grades.sql');

// stringOrJoin :: Object -> String
const stringOrJoin = (obj) => {
  return is(String, obj) ? obj : obj.join(',');
};

// getRefineriesByCompanies :: DB -> [Company.id] -> [Refinery]
const getRefineriesByCompanies = (client, c_ids) => {
  return node((done) => {
    return qGetRefineriesByCompanies(client, [c_ids.join(', ')], (err, res) => {
      done(err, res.rows);
    });
  });
};

// getSegmentsByCompanies :: DB -> [Company.id] -> [Segment]
const getSegmentsByCompanies = (client, c_ids) => {
  return node((done) => {
    return qGetSegmentsByCompanies(client, [c_ids.join(', ')], (err, res) => {
      done(err, res.rows);
    });
  });
}

// getTerminalsByCompanies :: DB -> [Company.id] -> [Terminal]
const getTerminalsByCompanies = (client, c_ids) => {
  return node((done) => {
    return qGetTerminalsByCompanies(client, [stringOrJoin(c_ids)], (err, res) => {
      done(err, res.rows);
    });
  });
}

// getRefineriesByGrades :: DB -> [Grade.id] -> [Refinery]
const getRefineriesByGrades = (client, g_ids) => {
  return node((done) => {
    return qGetRefineriesByGrades(client, [g_ids.join(', ')], (err, res) => {
      done(err, res.rows);
    });
  });
};

// getSegmentsByGrades :: DB -> [Grade.id] -> [Segment]
const getSegmentsByGrades = (client, g_ids) => {
  return node((done) => {
    return qGetSegmentsByGrades(client, [g_ids.join(', ')], (err, res) => {
      done(err, res.rows);
    });
  });
};

// getTerminalsByGrades :: DB -> [Grade.id] -> [Terminal]
const getTerminalsByGrades = (client, g_ids) => {
  return node((done) => {
    return qGetTerminalsByGrades(client, [g_ids.join(', ')], (err, res) => {
      done(err, res.rows);
    });
  });
};

// filter :: DB -> [Company.id] -> [Location.type] -> [Grade.id] -> Object
exports.filter = (client, c_ids, l_types, g_ids) => {
  return getTerminalsByCompanies(client, c_ids);
};
