const redis = require('redis');
const config = require('config');
const csv = require('csv-streamify');
const fs = require('fs');
const uuidv1 = require('uuid/v1');

const client = redis.createClient(config.get('redis'));

fs.createReadStream('./locations.csv').pipe(csv({objectMode: true, columns: true}))
  .on('data', (row) => {
    const location = {
      id: uuidv1(),
      name: row.location_name,
      longitude: row.longitude,
      latitude: row.latitude,
      owner: row.company_owner,
      opStatus: row.operational_status,
      capacity: row.storage_capacity,
      address: {
        line1: row.address,
        line2: '',
        city: row.city,
        state: row.state,
        zip: row.zip_code
      },
      contact: {
        name: row.location_contact_name_1,
        role: row.location_contact_role_1,
        phone: row.phone_number,
        cell: row.cell_number,
        email: row.location_contact_email_address_1
      },
      pipelines: row.pipeline_connections.split(', '),
      bays: row.count_truck_bays,
      racks: row.gross_rack_capacity,
      servicePipeline: row.access_pipeline,
      serviceTruck: row.access_truck,
      serviceRail: row.access_rail,
      serviceMarine: row.access_water,
      tankCount: row.count_tank,
      products: row.products.split(', '),
      trifacilityid: row.trifacilityid,
      tanks: []
    };
    client.lpush(row.type.toLowerCase(), JSON.stringify(location));
  })
  .on('end', () => {
    process.exit();
  });

