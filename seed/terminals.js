const config = require('config');
const csv = require('csv-streamify');
const fs = require('fs');

const { Pool } = require('pg');
const pool = new Pool(config.get('pg'));


let rows = 0;
exports.seed = () => {
    fs.createReadStream(`${__dirname}/terminals.csv`).pipe(csv({ objectMode: true, columns: true }))
        .on('data', (row) => {
            rows++;
            (async() => {
                const terminal = {
                    city: row.city,
                    contact_email: row.contact_email,
                    contact_fax: row.contact_fax,
                    contact_name: row.contact_name,
                    contact_phone: row.contact_phone,
                    contact_role: row.contact_role,
                    latitude: parseFloat(row.latitude),
                    longitude: parseFloat(row.longitude),
                    name: row.name,
                    operational: row.operational,
                    rack_capacity: row.rack_capacity == '' ? null : row.rack_capacity,
                    state: row.state,
                    storage_capacity: row.storage_capacity == '' ? null : row.storage_capacity,
                    street: row.street,
                    operator_id: row.operator_id,
                    owner_id: row.owner_id,
                    terminaling_capacity: row.terminaling_capacity == '' ? null : row.terminaling_capacity,
                    truck_bays: row.truck_bays == '' ? null : row.truck_bays,
                    type: row.type,
                    zip: row.zip,
                    pipeline_access: row.pipeline_access == '' ? null : row.pipeline_access,
                    rail_access: row.rail_access == '' ? null : row.rail_access,
                    truck_access: row.truck_access == '' ? null : row.truck_access,
                    marine_access: row.marine_access == '' ? null : row.marine_access
                };

                const k = Object.keys(terminal).join(', ');
                const v = Object.keys(terminal).map((v, k) => `$${k + 1}`).join(', ');
                pool.query(`INSERT INTO web.terminals(${k}) VALUES(${v})`, Object.values(terminal), (err, res) => {
                    if (err) console.error(err);
                    if (res) rows--;
                    if (rows === 0) process.exit();
                });
            })();
        });
};