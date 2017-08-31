const config = require('config');
const csv = require('csv-streamify');
const fs = require('fs');

const { Pool } = require('pg');

const pool = new Pool(config.get('pg'));

exports.seed = () => {
  let rows = 0;
  fs.createReadStream(`${__dirname}/pipeline_movements.csv`)
    .pipe(csv({objectMode: true, columns: true, newline: '\r'}))
    .on('data', (row) => {
      rows++;
      const movement = {
        transaction: row.transaction,
        path_id: parseInt(row.path_id, 10),
        grade_id: parseInt(row.grade_id, 10),
        volume: parseInt(row.volume, 10),
        start: new Date(`${row.start_date} ${row.start_time}`),
        end: new Date(`${row.end_date} ${row.end_time}`),
        status: row.status.toLowerCase()
      };
      const k = Object.keys(movement).map(k => `"${k}"`).join(', ');
      const v = Object.keys(movement).map((v, k) => `$${k + 1}`).join(', ');
      pool.query(`INSERT INTO web.pipeline_movements(${k}) VALUES(${v})`,
                 Object.values(movement), (err, res) => {
        if (err) console.error(err);
        if (res) {
          rows--;
        }
        if (rows === 0) process.exit();
      });
    });
};
