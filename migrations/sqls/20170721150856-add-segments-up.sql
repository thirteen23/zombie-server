CREATE TABLE web.segments (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  pipeline_id INT REFERENCES web.pipelines(id),
  origin_id INT REFERENCES web.locations(id),
  destination_id INT REFERENCES web.locations(id),
  coordinates LSEG[],
  length INT,
  diameter INT[],
  capacity INT,
  operational BOOLEAN
);
