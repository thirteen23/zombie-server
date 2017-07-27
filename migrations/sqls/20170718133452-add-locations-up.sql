CREATE TABLE web.locations (
  id SERIAL PRIMARY KEY,
  ref_id INT NOT NULL,
  type VARCHAR CHECK (type IN ('refinery','station','terminal')) NOT NULL,
  UNIQUE (ref_id, type)
);
