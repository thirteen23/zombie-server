CREATE TYPE status AS ENUM ('operational');

CREATE TYPE access AS ENUM ('in', 'out', 'both', 'none');

CREATE TABLE refineries (
  id SERIAL PRIMARY KEY,
  code VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  owner_id INT REFERENCES companies(id),
  operator_id INT REFERENCES companies(id),
  status STATUS,
  processing_capacity INT,
  pipeline_access ACCESS,
  rail_access ACCESS,
  truck_access ACCESS,
  marine_access ACCESS,
  contact_name VARCHAR,
  contact_phone VARCHAR,
  contact_role VARCHAR,
  contact_email VARCHAR,
  street VARCHAR,
  city VARCHAR,
  state CHAR(2),
  zip VARCHAR(5)
);
