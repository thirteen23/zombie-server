const config = require('config');
const csv = require('csv-streamify');
const fs = require('fs');

const { Pool } = require('pg');

const pool = new Pool(config.get('pg'));


exports.seed = () => {
    let rows = 0;
    fs.createReadStream(`${__dirname}/tanks.csv`).pipe(csv({ objectMode: true, columns: true }))
        .on('data', (row) => {
            const grade_id = row.grade_id == '' ? null : row.grade_id;
            const operational = row.operational;
            const terminal_id = row.terminal_id;
            rows++;
            pool.query('INSERT INTO web.tanks(grade_id, operational, terminal_id) VALUES($1, $2, $3)', [grade_id, operational, terminal_id],
                (err, res) => {
                    if (err) console.error(err);
                    if (res) {
                        rows--;
                    }
                    if (rows === 0) process.exit();
                });
        });
};