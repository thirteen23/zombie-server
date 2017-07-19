const config = require('config');
const csv = require('csv-streamify');
const fs = require('fs');

const { Pool } = require('pg');

const pool = new Pool(config.get('pg'));

exports.seed = () => {
  let rows = 0;
  fs.createReadStream(`${__dirname}/refineries.csv`).pipe(csv({objectMode: true, columns: true}))
    .on('data', (row) => {
      rows++;
      const products = eval(row.products.replace(/u/g, ''));
      pool.query('SELECT id FROM ')
      pool.query('INSERT INTO grades(name, product_id, product_group, active) VALUES($1, $2, $3, $4)',
                 [name, product_id, product_group, active],
                 (err, res) => {
                   if (err) console.error(err);
                   if (res) {
                     rows--;
                   }
                   if (rows === 0) process.exit();
                 });
    });
};
