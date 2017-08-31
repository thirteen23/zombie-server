const config = require('config');
const csv = require('csv-streamify');
const fs = require('fs');
const moment = require('moment');

const { Pool } = require('pg');

const pool = new Pool(config.get('pg'));

exports.seed = () => {
  let rows = 0;
  fs.createReadStream(`${__dirname}/nominations.csv`).pipe(csv({objectMode: true, columns: true}))
    .on('data', (row) => {
      const nomination = {
        path_id: parseInt(row.path_id, 10),
        grade_id: parseInt(row.grade_id, 10),
        start: moment(new Date(row.start)).add(1, 'd').toDate(),
        end: moment(new Date(row.end)).add(1, 'd').toDate(),
        nominated_max: parseInt(row.nominated_max, 10)
      };
      const k = Object.keys(nomination).map((k) => `"${k}"`).join(', ');
      const v = Object.keys(nomination).map((v, k) => `$${k + 1}`).join(', ');
      pool.query(`INSERT INTO web.nominations(${k}) VALUES(${v})`, Object.values(nomination), (err, res) => {
        if (err) console.error(err);
        if (res) {
          rows--;
        }
        if (rows === 0) process.exit();
      });
    });
};
