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
    fs.createReadStream(`${__dirname}/movements.csv`).pipe(csv({ objectMode: true, columns: true }))
        .on('data', (row) => {
            (async() => {
                const movement = {
                    destination_end: row.destination_end == '' ? null : row.destination_end,
                    destination_start: row.destination_start == '' ? null : row.destination_start,
                    grade_id: row.grade_id,
                    destination_id: row.destination_id,
                    origin_id: row.origin_id,
                    origin_end: row.origin_end == '' ? null : row.origin_end,
                    origin_start: row.origin_start == '' ? null : row.origin_start,
                    transaction: row.transaction == '' ? null : row.transaction,
                    volume: row.volume,
                    type: row.type == '' ? null : row.type,
                    status: row.status == '' ? null : row.status
                };
                const k = Object.keys(movement).join(', ');
                const v = Object.keys(movement).map((v, k) => `$${k + 1}`).join(', ');
                pool.query(`INSERT INTO web.movements(${k}) VALUES(${v})`, Object.values(movement), (err, res) => {
                    if (err) console.error(err);
                    if (res) rows--;
                    if (rows === 0) process.exit();
                });
            })();
        });
};