const config = require('config');
const fs = require('fs');
const byline = require('byline');

const { Client } = require('pg');

const client = new Client(config.get('pg'));

client.connect();

const rStream = byline(fs.createReadStream(`${__dirname}/segments.txt`, 'utf8'));

let rows = 0;

rStream.on('data', (row) => {
  rows++;
  const [id, coordinates] = row.split('\t');
  client.query('UPDATE web.segments SET coordinates = $1 WHERE id = $2', [coordinates, id], (err, res) => {
    if (err) console.error(err);
    if (res) rows--;
    if (rows === 0) process.exit();
  });
});
