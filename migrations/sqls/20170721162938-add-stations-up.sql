CREATE TABLE stations (
  id SERIAL PRIMARY KEY,
  type VARCHAR DEFAULT 'station',
  name VARCHAR,
  latitude REAL,
  longitude REAL,
  FOREIGN KEY (id, type) REFERENCES locations(ref_id, type)
);
