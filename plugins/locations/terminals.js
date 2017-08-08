const {node, parallel} = require('fluture');
const sqlt = require('sqlt');
const S = require('../../sanctuary');
const {compose, curry2, curry3, equals, filter, lift3, map} = S;
const {head, assoc} = require('ramda');

const qGetTerminals = sqlt(__dirname + '/queries/get_terminals.sql');
const qGetTerminal = sqlt(__dirname + '/queries/get_terminal.sql');
const qGetTerminalPipelines = sqlt(__dirname + '/queries/get_terminal_pipelines.sql');
const qGetTerminalProducts = sqlt(__dirname + '/queries/get_terminal_products.sql');
const qGetTerminalGrades = sqlt(__dirname + '/queries/get_terminal_grades.sql');
const qGetTerminalMovements = sqlt(__dirname + '/queries/get_terminal_movements.sql');
const qGetTerminalRundowns = sqlt(__dirname + '/queries/get_terminal_rundowns.sql');
const qGetTerminalForecastRundowns = sqlt(__dirname + '/queries/get_terminal_forecast_rundowns.sql');
const qGetTerminalInventory = sqlt(__dirname + '/queries/get_terminal_inventory.sql');

// sortPipelines :: [Pipeline] -> Obj
const sortPipelines = (pipelines) => {
  return {
    inbound: filter((pipeline) => equals(pipeline.direction, 'inbound'), pipelines),
    outbound: filter((pipeline) => equals(pipeline.direction, 'outbound'), pipelines)
  };
};

// addArray :: [] -> String -> Obj -> Obj
const addArray = curry3((key, arr, obj) => {
  return assoc(key, arr, obj)
});

// getTerminals :: DB -> Future [Terminal]
exports.getTerminals = (client) => {
  return node((done) => {
    qGetTerminals(client, (err, res) => {
      done(err, res.rows);
    });
  }).chain((terminals) => {
    return parallel(10, terminals.map((terminal) => {
      return node((done) => {
        return qGetTerminalGrades(client, [terminal.id], (err, res) => {
          return done(err, res.rows);
        });
      }).map(grades => Object.assign({grades}, terminal));
    }));
  }).chain((terminals) => {
    return parallel(10, terminals.map((terminal) => {
      return node((done) => {
        return qGetTerminalProducts(client, [terminal.id], (err, res) => {
          return done(err, res.rows);
        });
      }).map(products => Object.assign({products}, terminal));
    }));
  });
};

// getTerminal :: DB -> Int -> Future Terminal
exports.getTerminal = (client, id) => {
  const terminal =  map(head, node((done) => {
    qGetTerminal(client, [id], (err, res) => {
      done(err, res.rows);
    });
  }));
  const pipelines = map(sortPipelines, node((done) => {
    qGetTerminalPipelines(client, [id], (err, res) => {
      done(err, res.rows);
    });
  }));
  const grades = node((done) => {
    qGetTerminalGrades(client, [id], (err, res) => {
      done(err, res.rows);
    });
  });
  return lift3(curry3((t, p, g) => {
    return compose(addArray('grades', g), addArray('pipelines', p))(t);
  }), terminal, pipelines, grades);
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
exports.getTerminalRundowns = (client, terminal_id, grade_id, start, end) => {
  return node((done) => {
    qGetTerminalRundowns(client, [terminal_id, grade_id, start, end], (err, res) => {
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

// getTerminalInventory :: DB -> Int -> Int -> Date -> Future Inventory
exports.getTerminalInventory = (client, terminal_id, grade_id, day) => {
  return map(head, node((done) => {
    qGetTerminalInventory(client, [terminal_id, grade_id, day], (err, res) => {
      done(err, res.rows);
    });
  }));
};
