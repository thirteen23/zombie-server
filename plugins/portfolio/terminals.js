const {node} = require('fluture');
const sqlt = require('sqlt');

const qGetTerminalsInventory = sqlt(__dirname + '/queries/get_terminals_inventory.sql');
const qGetTerminalsForecastInventory = sqlt(__dirname + '/queries/get_terminals_forecast_inventory.sql');

exports.getTerminalsInventory = (client, start, end) => {
  return node((done) => {
    qGetTerminalsInventory(client, [start, end], (err, res) => {
      done(err, res.rows);
    });
  });
};

exports.getTerminalsForecastInventory = (client, start, end) => {
  return node((done) => {
    qGetTerminalsForecastInventory(client, [start, end], (err, res) => {
      done(err, res.rows);
    });
  });
};
