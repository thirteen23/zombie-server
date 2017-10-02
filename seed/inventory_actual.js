const config = require('config');
const csv = require('csv-streamify');
const fs = require('fs');

const { Pool } = require('pg');

const pool = new Pool(config.get('pg'));

const bool = (val) => {
    if (val.toLowerCase() === 'false') return false;
    return true;
};

exports.seed = () => {
    let rows = 0;
    fs.createReadStream(`${__dirname}/inventory_actual.csv`).pipe(csv({ objectMode: true, columns: true }))
        .on('data', (row) => {
            rows++;
            (async() => {
                const inventory = {
                    opening_stock: row.opening_stock,
                };
                const k = Object.keys(inventory).join(', ');
                const v = Object.keys(inventory).map((v, k) => `$${k + 1}`).join(', ');
                pool.query(`INSERT INTO web.inventory_actual(${k}) VALUES(${v})`, Object.values(inventory), (err, res) => {
                    if (err) console.error(err);
                    if (res) rows--;
                    if (rows === 0) process.exit();
                });
            })();
        });
};