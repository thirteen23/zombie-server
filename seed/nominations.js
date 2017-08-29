const config = require('config');
const csv = require('csv-streamify');
const fs = require('fs');
const moment = require('moment');
const twix = require('twix');

const { Pool } = require('pg');

const pool = new Pool(config.get('pg'));

exports.seed = () => {
  let rows = 0;
  fs.createReadStream(`${__dirname}/nominations.csv`).pipe(csv({objectMode: true, columns: true}))
    .on('data', (row) => {
      const start = moment(new Date(row.start)).add(1, 'd');
      const stop = moment(new Date(row.stop)).add(1, 'd');
      const range = start.twix(stop, true);
      const iter = range.iterate('days');
      const days = range.length('days');
      do {
        rows++;
        const s = iter.next();
        const movement = {
          path_id: parseInt(row.path_id, 10),
          grade_id: parseInt(row.grade_id, 10),
          volume: Math.floor(parseInt(row.nominated_max, 10) / days),
          start: s.toDate(),
          stop: s.add(1, 'm').toDate(),
          status: 'nomination'
        };
        const k = Object.keys(movement).join(', ');
        const v = Object.keys(movement).map((v, k) => `$${k + 1}`).join(', ');
        pool.query(`INSERT INTO web.pipeline_movements(${k}) VALUES(${v})`, Object.values(movement), (err, res) => {
          if (err) console.error(err);
          if (res) {
            rows--;
          }
          if (rows === 0) process.exit();
        });
      } while (iter.hasNext());

    });
};
