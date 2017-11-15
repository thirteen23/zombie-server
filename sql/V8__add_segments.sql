-- Static
CREATE TABLE web.segments (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  pipeline_id INT REFERENCES web.pipelines(id) NOT NULL,
  origin_id INT REFERENCES web.locations(id),
  destination_id INT REFERENCES web.locations(id),
  coordinates FLOAT[][],
  length INT CHECK (length >= 0),
  diameter INT[],
  capacity INT CHECK (capacity >= 0),
  operational BOOLEAN NOT NULL DEFAULT FALSE
);
