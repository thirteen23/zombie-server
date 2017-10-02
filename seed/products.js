const config = require('config');
const csv = require('csv-streamify');
const fs = require('fs');

const { Pool } = require('pg');

const pool = new Pool(config.get('pg'));

exports.seed = () => {
    let rows = 0;
    fs.createReadStream(`${__dirname}/products.csv`).pipe(csv({ objectMode: true, columns: true }))
        .on('data', (row) => {
            const name = row.name;
            const category_id = row.category_id;
            rows++;
            pool.query('INSERT INTO web.products(name, category_id) VALUES($1, $2)', [name, category_id], (err, res) => {
                if (err) console.error(err);
                if (res) {
                    rows--;
                }
                if (rows === 0) process.exit();
            });
        });
};