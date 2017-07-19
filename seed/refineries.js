const config = require('config');
const csv = require('csv-streamify');
const fs = require('fs');

const { Pool } = require('pg');

const pool = new Pool(config.get('pg'));

const codify = (name) => {
  return name.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_').toLowerCase();
}

const access = (acc) => {
  if (acc.toLowerCase() === 'yes') return 'both';
  return 'none';
}

let rows = 0;

exports.seed = () => {

  fs.createReadStream(`${__dirname}/refineries.csv`).pipe(csv({objectMode: true, columns: true}))
    .on('data', (row) => {
      rows++;
      (async () => {
        const owner = await pool.query('SELECT id FROM companies WHERE code = $1::text', [codify(row.companyOwner)]);
        const operator = await pool.query('SELECT id FROM companies WHERE code = $1::text', [codify(row.companyOperator)]);
        const refinery = {
          code: row.locationName.replace(/\s/g, '_').toLowerCase(),
          name: row.locationName,
          latitude: parseFloat(row.latitude),
          longitude: parseFloat(row.longitude),
          owner_id: owner.rows[0].id,
          operator_id: operator.rows[0].id,
          status: row.operationalStatus.toLowerCase(),
          processing_capacity: parseInt(row.processingCapacity, 10),
          pipeline_access: access(row.accessPipeline),
          rail_access: access(row.accessRail),
          truck_access: access(row.accessTruck),
          marine_access: access(row.accessMarine),
          contact_name: row.name,
          contact_phone: row.phone,
          contact_role: row.role,
          contact_email: row.email,
          street: row.line1,
          city: row.city,
          state: row.state,
          zip: row.zip
        };
        const k = Object.keys(refinery).join(', ');
        const v = Object.keys(refinery).map((v, k) => `$${k + 1}`).join(', ');
        pool.query(`INSERT INTO refineries(${k}) VALUES(${v})`, Object.values(refinery), (err, res) => {
          if (err) console.error(err);
          if (res) rows--;
          if (rows === 0) process.exit();
        });
      })();
    });
  
};
