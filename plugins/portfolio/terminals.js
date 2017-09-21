const { node } = require('fluture');
const sqlt = require('sqlt');
const { intArray } = require('../../utils/intArray');

const qGetTerminalsInventory = sqlt(__dirname + '/queries/get_terminals_inventory.sql');
const qGetTerminalsForecastInventory = sqlt(__dirname + '/queries/get_terminals_forecast_inventory.sql');

exports.getTerminalsInventory = (client, grade, terminals, start, end) => {
  return node((done) => {
    qGetTerminalsInventory(client, [grade, intArray(terminals), start, end], (err, res) => {
      console.log(err);
      done(err, res.rows);
    });
  });
};

exports.getTerminalsForecastInventory = (client, grade, terminals, start, end) => {
  return node((done) => {
    qGetTerminalsForecastInventory(client, [grade, intArray(terminals), start, end], (err, res) => {
      console.log(err);
      done(err, res.rows);
    });
  });
};
