const { node } = require('fluture');
const sqlt = require('sqlt');

const qGetNominationPeriods = sqlt(__dirname + '/queries/get_nomination_periods.sql');

exports.getNominationPeriods = (client) => {
  return node((done) => {
    qGetNominationPeriods(client, (err, res) => done(err, res.rows));
  });
};
