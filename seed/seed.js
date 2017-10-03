const config = require('config');
const csv = require('csv-streamify');
const fs = require('fs');

const { Pool } = require('pg');
const pool = new Pool(config.get('pg'));

const files = [
  'companies',
  'company_links',
  'categories',
  'products',
  'grades',
  'stations',
  'refineries',
  'terminals',
  'locations',
  'tanks',
  'pipelines',
  'segments',
  'paths',
  'movements',
  'nominations',
  'pipeline_movements',
  'inventory_actual',
  'inventory_forecast'
];

const iter = files[Symbol.iterator]();

const streamInsert = (next) => {
  if (next.done) process.exit();
  const file = next.value;
  let rows = 0;
  fs.createReadStream(`${__dirname}/${file}.csv`)
    .pipe(csv({ objectMode: true, columns: true }))
    .on('data', (row) => {
      rows++;
      (async() => {
        const k = Object.keys(row).map(val => `"${val}"`).join(', ');
        const v = Object.values(row).map((v, k) => `$${k + 1}`).join(', ');
        const values = Object.values(row).map((value) => value === '' ? null : value);
        pool.query(`INSERT INTO web.${file}(${k}) VALUES(${v})`, values, (err, res) => {
          if (err) console.log(file, rows, k, values, err);
          if (res) rows--;
          if (rows === 0) streamInsert(iter.next());
        });
      })();
    });
};

streamInsert(iter.next());
