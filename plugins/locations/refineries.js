const {node} = require('fluture');
const sqlt = require('sqlt');
const S = require('../../sanctuary.js');
const {map} = S;
const {head} = require('ramda');

const qGetRefineries = sqlt(__dirname + '/queries/get_refineries.sql');
const qGetRefinery = sqlt(__dirname + '/queries/get_refinery.sql');

// getRefineries :: DB -> Future [Refinery]
exports.getRefineries = (client) => {
  return node((done) => {
    qGetRefineries(client, (err, res) => {
      done(err, res.rows);
    });
  });
};

// getRefinery :: DB -> Int -> Future Refinery
exports.getRefinery = (client, id) => {
  return map(head, node((done) => {
    qGetRefinery(client, [id], (err, res) => {
      done(err, res.rows);
    });
  }));
};
