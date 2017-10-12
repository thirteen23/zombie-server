const config = require('config');
const fs = require('fs');
const qStream = require('pg-query-stream');

const S = require('../sanctuary');
const {assoc, head} = require('ramda');
const sqlt = require('sqlt');
const {map} = S;

const { Client } = require('pg');

const client = new Client({
  user: "u2vrif7spsjju8",
  password: "p76885368f1c2de3b3a55c1cde86606d92beeb045bb0e305130e78396d9cafa25",
  database: "d6fchpupkc56nr",
  host: "ec2-34-226-250-152.compute-1.amazonaws.com",
  port: "5432",
  ssl: true
});

// pointsToArray :: Object -> Array
const pointsToArray = ({x, y}) => {
  return [y, x];
};

// coordsToCoords :: Object -> Object
const coordsToCoords = (segment) => {
  const coordinates = new Array();
  for (let i = 0; i < segment.coordinates.length; i++) {
    coordinates.push(pointsToArray(segment.coordinates[i]));
  }
  return assoc('coordinates', coordinates, segment);
};

client.connect();

const query = new qStream('SELECT id, coordinates FROM web.segments ORDER BY id ASC');

const stream = client.query(query);

const wStream = fs.createWriteStream(`${__dirname}/segments.txt`);

stream.on('data', (row) => {
  const segment = coordsToCoords(row);
  segment.coordinates = JSON.stringify(segment.coordinates).replace(/\[/g, '{').replace(/\]/g, '}');
  wStream.write(`${segment.id}\n${segment.coordinates}\n`);
}).on('end', () => {
  wStream.end();
  process.exit();
});
