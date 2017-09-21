const { node } = require('fluture');
const sqlt = require('sqlt');
const { intArray } = require('../../utils/intArray');

const qGetPortfolioGrades = sqlt(__dirname + '/queries/get_portfolio_grades.sql');

exports.getPortfolioGrades = (client, r_ids, s_ids, t_ids) => {
  return node((done) => {
    return qGetPortfolioGrades(client, [intArray(s_ids), intArray(t_ids)], (err, res) => {
      done(err, res.rows);
    });
  });
};
