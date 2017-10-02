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
    fs.createReadStream(`${__dirname}/segments.csv`).pipe(csv({ objectMode: true, columns: true }))
        .on('data', (row) => {
            rows++;
            (async() => {
                const segment = {
                    name: row.name,
                    pipeline_id: row.pipeline_id,
                    origin_id: row.origin_id,
                    destination_id: row.destination_id,
                    coordinates: row.coordinates,
                    length: row.length,
                    diameter: row.diameter,
                    capacity: row.capacity,
                    operational: row.operational,
                };
                const k = Object.keys(segment).join(', ');
                const v = Object.keys(segment).map((v, k) => `$${k + 1}`).join(', ');
                pool.query(`INSERT INTO web.segments(${k}) VALUES(${v})`, Object.values(segment), (err, res) => {
                    if (err) console.error(err);
                    if (res) rows--;
                    if (rows === 0) process.exit();
                });
            })();
        });
};