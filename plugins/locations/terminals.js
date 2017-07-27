const {node} = require('fluture');
const sqlt = require('sqlt');
const S = require('../../sanctuary');
const {map} = S;
const {head} = require('ramda');

const qGetTerminals = sqlt(__dirname + '/queries/get_terminals.sql');
const qGetTerminal = sqlt(__dirname + '/queries/get_terminal.sql');

// getTerminals :: DB -> Future [Terminal]
exports.getTerminals = (client) => {
  return node((done) => {
    qGetTerminals(client, (err, res) => {
      done(err, res.rows);
    });
  });
};

// getTerminal :: DB -> Int -> Future Terminal
exports.getTerminal = (client, id) => {
  return map(head, node((done) => {
    qGetTerminal(client, [id], (err, res) => {
      done(err, res.rows);
    });
  }));
};
