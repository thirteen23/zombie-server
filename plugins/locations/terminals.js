const {node} = require('fluture');
const sqlt = require('sqlt');
const S = require('../../sanctuary');
const {curry2, equals, filter, lift2, map} = S;
const {head, assoc} = require('ramda');

const qGetTerminals = sqlt(__dirname + '/queries/get_terminals.sql');
const qGetTerminal = sqlt(__dirname + '/queries/get_terminal.sql');
const qGetTerminalPipelines = sqlt(__dirname + '/queries/get_terminal_pipelines.sql');
const qGetTerminalMovements = sqlt(__dirname + '/queries/get_terminal_movements.sql');
const qGetTerminalRundowns = sqlt(__dirname + '/queries/get_terminal_rundowns.sql');
const qGetTerminalForecastRundowns = sqlt(__dirname + '/queries/get_terminal_forecast_rundowns.sql');

// sortPipelines :: [Pipeline] -> Obj
const sortPipelines = (pipelines) => {
  return {
    inbound: filter((pipeline) => equals(pipeline.direction, 'inbound'), pipelines),
    outbound: filter((pipeline) => equals(pipeline.direction, 'outbound'), pipelines)
  };
};

// addPiplines :: [Pipeline] -> Terminal -> Terminal
const addPipelines = curry2((pipelines, terminal) => {
  return assoc('pipelines', sortPipelines(pipelines), terminal)
});

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
  const terminal =  map(head, node((done) => {
    qGetTerminal(client, [id], (err, res) => {
      done(err, res.rows);
    });
  }));
  const pipelines = node((done) => {
    qGetTerminalPipelines(client, [id], (err, res) => {
      done(err, res.rows);
    });
  });
  return lift2(addPipelines, pipelines, terminal);
};

// getTerminalMovements :: DB -> Int -> Int -> Date -> Date -> Future [Movement]
exports.getTerminalMovements = (client, terminal_id, grade_id, start, end) => {
  return node((done) => {
    qGetTerminalMovements(client, [terminal_id, grade_id, start, end], (err, res) => {
      done(err, res.rows);
    });
  });
};

// getTerminalRundowns :: DB -> Int -> Int -> Future [Rundown]
exports.getTerminalRundowns = (client, terminal_id, grade_id) => {
  return node((done) => {
    qGetTerminalRundowns(client, [terminal_id, grade_id], (err, res) => {
      done(err, res.rows);
    });
  });
};

// getTerminalForecastRundowns :: DB -> Int -> Int -> Future [Forecast]
exports.getTerminalForecastRundowns = (client, terminal_id, grade_id) => {
  return node((done) => {
    qGetTerminalForecastRundowns(client, [terminal_id, grade_id], (err, res) => {
      done(err, res.rows);
    });
  });
};

exports.getTerminalInventory = () => true;
