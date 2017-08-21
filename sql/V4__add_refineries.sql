CREATE TYPE web.access AS ENUM ('in', 'out', 'both', 'none');

CREATE TABLE web.refineries (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  type VARCHAR DEFAULT 'refinery',
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  owner_id INT REFERENCES web.companies(id) NOT NULL,
  operator_id INT REFERENCES web.companies(id) NOT NULL,
  operational BOOLEAN NOT NULL DEFAULT FALSE,
  processing_capacity INT CHECK (processing_capacity >= 0),
  pipeline_access web.access,
  rail_access web.access,
  truck_access web.access,
  marine_access web.access,
  contact_name VARCHAR,
  contact_phone VARCHAR,
  contact_fax VARCHAR,
  contact_role VARCHAR,
  contact_email VARCHAR,
  street VARCHAR,
  city VARCHAR,
  state CHAR(2),
  zip VARCHAR(5),
  FOREIGN KEY (id, type) REFERENCES web.locations(ref_id, type) MATCH FULL
);
