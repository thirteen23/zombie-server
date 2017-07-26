const config = require('config');
const csv = require('csv-streamify');
const fs = require('fs');

const { Pool } = require('pg');

const pool = new Pool(config.get('pg'));

let rows = 0;

exports.seed = () => {

  fs.createReadStream(`${__dirname}/stations.csv`).pipe(csv({objectMode: true, columns: true}))
    .on('data', (row) => {
      rows++;
      (async () => {
        const station = {
          name: row.locationName,
          latitude: parseFloat(row.latitude),
          longitude: parseFloat(row.longitude)
        };
        const k = Object.keys(station).join(', ');
        const v = Object.keys(station).map((v, k) => `$${k + 1}`).join(', ');
        pool.query(`INSERT INTO stations(${k}) VALUES(${v})`, Object.values(station), (err, res) => {
          if (err) console.error(err);
          if (res) rows--;
          if (rows === 0) process.exit();
        });
      })();
    });
  
};
