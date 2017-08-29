const config = require('config');
const csv = require('csv-streamify');
const fs = require('fs');

const { Pool } = require('pg');

const pool = new Pool(config.get('pg'));

exports.seed = () => {
  let rows = 0;
  fs.createReadStream(`${__dirname}/paths.csv`).pipe(csv({objectMode: true, columns: true}))
    .on('data', (row) => {
      rows++;
      const k = Object.keys(row).join(', ');
      const v = Object.keys(row).map((v, k) => `$${k + 1}`).join(', ');
      console.log(rows);
      pool.query(`INSERT INTO web.paths(${k}) VALUES(${v})`,
                 Object.values(row),
                 (err, res) => {
                   if (err) console.error(err);
                   if (res) {
                     rows--;
                   }
        if (rows === 0) process.exit();
      });
    });
};
