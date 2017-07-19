const config = require('config');
const csv = require('csv-streamify');
const fs = require('fs');

const { Pool, Client } = require('pg');

const pool = new Pool(config.get('pg'));

exports.seed = () => {
  let rows = 0;
  fs.createReadStream(`${__dirname}/companies.csv`).pipe(csv({objectMode: true, columns: true}))
    .on('data', (row) => {
      const code = row.name.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_').toLowerCase();
      const name = row.name;
      rows++;
      pool.query('INSERT INTO companies(code, name) VALUES($1, $2)', [code, name], (err, res) => {
        if (err) console.error(err);
        if (res) {
          rows--;
        }
        if (rows === 0) process.exit();
      });
    });
};
