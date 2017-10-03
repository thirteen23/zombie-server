-- Static
CREATE TABLE web.stations (
  id SERIAL PRIMARY KEY,
  type VARCHAR DEFAULT 'station',
  name VARCHAR NOT NULL,
  latitude REAL NOT NULL,
  longitude REAL NOT NULL
);
