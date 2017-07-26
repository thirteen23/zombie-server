const config = require('config');
const csv = require('csv-streamify');
const fs = require('fs');

const { Pool } = require('pg');

const pool = new Pool(config.get('pg'));

const codify = (name) => {
  return name.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_').toLowerCase();
}

const access = (acc) => {
  switch (acc.toLowerCase()) {
  case 'yes':
    return 'both';
  case 'in':
    return 'in';
  case 'out':
    return 'out';
  default:
    return 'none';
  }
}

let rows = 0;

exports.seed = () => {

  fs.createReadStream(`${__dirname}/terminals.csv`).pipe(csv({objectMode: true, columns: true}))
    .on('data', (row) => {
      rows++;
      (async () => {
        const owner = await pool.query('SELECT id FROM companies WHERE name = $1::text', [row.companyOwner]);
        const operator = await pool.query('SELECT id FROM companies WHERE name = $1::text', [row.companyOperator]);
        const terminal = {
          name: row.locationName,
          latitude: parseFloat(row.latitude),
          longitude: parseFloat(row.longitude),
          owner_id: owner.rows[0].id,
          operator_id: operator.rows[0].id,
          status: row.operationalStatus.toLowerCase(),
          pipeline_access: access(row.accessPipeline),
          rail_access: access(row.accessRail),
          truck_access: access(row.accessTruck),
          marine_access: access(row.accessMarine),
          contact_name: row.name,
          contact_phone: row.phone,
          contact_fax: row.fax,
          contact_role: row.role,
          contact_email: row.email,
          street: row.line1,
          city: row.city,
          state: row.state,
          zip: row.zip
        };
        if (row.activeTerminalingCapacity != '') {
          terminal.terminaling_capacity = parseInt(row.activeTerminalingCapacity, 10);
        }
        if (row.truckBayCount != '') {
          terminal.truck_bays = parseInt(row.truckBayCount, 10);
        }
        if (row.tankCount != '') {
          terminal.tanks = parseInt(row.tankCount, 10);
        }
        if (row.grossRackCapacity != '') {
          terminal.rack_capacity = parseInt(row.grossRackCapacity, 10);
        }
        if (row.storageCapacity != '') {
          terminal.storage_capacity = parseInt(row.storageCapacity, 10);
        }
        const k = Object.keys(terminal).join(', ');
        const v = Object.keys(terminal).map((v, k) => `$${k + 1}`).join(', ');
        pool.query(`INSERT INTO terminals(${k}) VALUES(${v})`, Object.values(terminal), (err, res) => {
          if (err) console.error(err);
          if (res) rows--;
          if (rows === 0) process.exit();
        });
      })();
    });
  
};
