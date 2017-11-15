const config = require('config');
const fs = require('fs');
const csv = require('csv-streamify');
const { concat, head, pipe, replace, split, tail } = require('ramda');
const { Client } = require('pg');

const client = new Client(config.get('pg'));

client.connect();

// flatToTup :: [Coords] -> [{Lat, Lon}] -> [{Lat, Lon}]
const flatToTup = (coords, arr) => {
  if (coords.length < 2) {
    return arr;
  }
  const head1 = head(coords);
  const head2 = head(tail(coords));
  return flatToTup(tail(tail(coords)), concat(arr, [[head1, head2]]));
}

let rows = 0;

fs.createReadStream(`${__dirname}/coords.csv`)
  .pipe(csv({ objectMode: true, columns: true }))
  .on('data', (row) => {
    rows++;
    const { coordinates, id } = row;
    const coordToString = pipe(
      split(','),
      (coords) => flatToTup(coords, []),
      (coords) => JSON.stringify(coords),
      replace(/\[/g, '{'),
      replace(/\]/g, '}'),
      replace(/"/g, '')
    );
    client.query('UPDATE web.segments SET coordinates = $1 WHERE id = $2', [coordToString(coordinates), id], (err, res) => {
      if (err) console.error(err);
      if (res) rows--;
      if (rows === 0) process.exit();
    });
  });
