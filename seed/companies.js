const config = require('config');
const csv = require('csv-streamify');
const fs = require('fs');

const { Pool, Client } = require('pg');
const pool = new Pool(config.get('pg'));

exports.seed = () => {
    let rows = 0;
    fs.createReadStream(`${__dirname}/companies.csv`).pipe(csv({ objectMode: true, columns: true }))
        .on('data', (row) => {
            const name = row.name;
            rows++;
            pool.query('INSERT INTO web.companies(name) VALUES($1)', [name], (err, res) => {
                if (err) console.error(err);
                if (res) {
                    rows--;
                }
                if (rows === 0) process.exit();
            });
        });
};