const config = require('config');
const csv = require('csv-streamify');
const fs = require('fs');

const { Pool } = require('pg');
const pool = new Pool(config.get('pg'));

exports.seed = () => {
    let rows = 0;
    fs.createReadStream(`${__dirname}/paths.csv`).pipe(csv({ objectMode: true, columns: true }))
        .on('data', (row) => {
            const destination_id = row.destination_id;
            const origin_id = row.origin_id;
            const segment_id = row.segment_id;
            rows++;
            pool.query('INSERT INTO web.paths(destination_id, origin_id, segment_id) VALUES($1, $2, $3)', [destination_id, origin_id, segment_id],
                (err, res) => {
                    if (err) console.error(err);
                    if (res) {
                        rows--;
                    }
                    if (rows === 0) process.exit();
                });
        });
};