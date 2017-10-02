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
    fs.createReadStream(`${__dirname}/inventory_forecast.csv`).pipe(csv({ objectMode: true, columns: true }))
        .on('data', (row) => {
            rows++;
            (async() => {
                const inventory = {
                    closing_stock: row.closing_stock,
                };
                const k = Object.keys(inventory).join(', ');
                const v = Object.keys(inventory).map((v, k) => `$${k + 1}`).join(', ');
                pool.query(`INSERT INTO web.inventory_forecast(${k}) VALUES(${v})`, Object.values(inventory), (err, res) => {
                    if (err) console.error(err);
                    if (res) rows--;
                    if (rows === 0) process.exit();
                });
            })();
        });
};