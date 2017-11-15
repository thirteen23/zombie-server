const { node } = require('fluture');
const amqp = require('amqplib/callback_api');
const uuid = require('uuid/v1');
const sqlt = require('sqlt');
const { assoc } = require('ramda');
const S = require('../../sanctuary');
const format = require('date-fns/format');

const { intArray } = require('../../utils/intArray');

const { compose, concat, map, reduce } = S;

const qGetTerminalsInventory = sqlt(__dirname + '/queries/get_terminals_inventory.sql');
const qGetTerminalsForecastInventory = sqlt(__dirname + '/queries/get_terminals_forecast_inventory.sql');

exports.getTerminalsInventory = (client, grade, terminals, start, end) => {
  return node((done) => {
    qGetTerminalsInventory(client, [grade, intArray(terminals), start, end], (err, res) => {
      done(err, res.rows);
    });
  });
};

exports.getTerminalsForecastInventory = (client, grade, terminals, start, end) => {
  return node((done) => {
    qGetTerminalsForecastInventory(client, [grade, intArray(terminals), start, end], (err, res) => {
      done(err, res.rows);
    });
  });
};
