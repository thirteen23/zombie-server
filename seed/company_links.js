const config = require('config');
const csv = require('csv-streamify');
const fs = require('fs');

const { Pool, Client } = require('pg');
const pool = new Pool(config.get('pg'));

exports.seed = () => {
    let rows = 0;
    fs.createReadStream(`${__dirname}/company_links.csv`).pipe(csv({ objectMode: true, columns: true }))
        .on('data', (row) => {
            rows++;

            (async() => {
                const company_link = {
                    company_id: row.company_id,
                    url: row.url,
                    type: row.type
                };
                const k = Object.keys(company_link).join(', ');
                const v = Object.keys(company_link).map((v, k) => `$${k + 1}`).join(', ');
                pool.query(`INSERT INTO web.company_links(${k}) VALUES(${v})`, Object.values(company_link), (err, res) => {
                    if (err) console.error(err);
                    if (res) rows--;
                    if (rows === 0) process.exit();
                });
            })();
        });
};