const config = require('config');
const csv = require('csv-streamify');
const fs = require('fs');

const { Pool, Client } = require('pg');
const pool = new Pool(config.get('pg'));

exports.seed = () => {
    let rows = 0;
    fs.createReadStream(`${__dirname}/pipelines.csv`).pipe(csv({ objectMode: true, columns: true }))
        .on('data', (row) => {
            rows++;
            (async() => {
                const pipeline = {
                    name: row.name,
                    operator_id: row.operator_id,
                    owner_id: row.owner_id
                };
                const k = Object.keys(pipeline).join(', ');
                const v = Object.keys(pipeline).map((v, k) => `$${k + 1}`).join(', ');
                pool.query(`INSERT INTO web.pipelines(${k}) VALUES(${v})`, Object.values(pipeline), (err, res) => {
                    if (err) console.error(err);
                    if (res) rows--;
                    if (rows === 0) process.exit();
                });
            })();
        });
};