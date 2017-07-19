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
  fs.createReadStream(`${__dirname}/grades.csv`).pipe(csv({objectMode: true, columns: true}))
    .on('data', (row) => {
      const name = row.grade;
      const product_id = row.product_id;
      const product_group = row.productGroup;
      const active = bool(row.active);
      rows++;
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
