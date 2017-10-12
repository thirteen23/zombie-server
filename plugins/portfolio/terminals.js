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

exports.getTerminalsForecastEditsInventory = (client, edits) => {
  const cid = uuid();
  const e = map(edit => assoc('day', format(edit.day, 'YYYY-MM-DD'), edit), edits);
  const message = {
    id: cid,
    task: 'update_forecasts_user',
    args: [e],
    kwargs: {},
    retries: 0,
  };
  return node((done) => {
    amqp.connect('amqp://bayzyenfe:CAp84pwQUxaYp2WK@ec2-18-220-89-1.us-east-2.compute.amazonaws.com', (err, conn) => {
      conn.createChannel((err, chan) => {
        chan.consume('analytics', (msg) => {
          const forecasts = JSON.parse(msg.content.toString()).data.data;
          conn.close();
          return done(null, JSON.parse(JSON.stringify(forecasts)));
        });
        chan.sendToQueue('analytics', new Buffer(JSON.stringify(message)), {
          correlationId: cid,
          contentType: 'application/json',
          replyTo: 'analytics'
        });
      });
    });
  });
};
