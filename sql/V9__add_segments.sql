-- Static
CREATE TABLE web.segments (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  pipeline_id INT REFERENCES web.pipelines(id) NOT NULL,
  origin_id INT REFERENCES web.locations(id) NOT NULL,
  destination_id INT REFERENCES web.locations(id) NOT NULL,
  coordinates POINT[] NOT NULL,
  length INT CHECK (length >= 0),
  diameter INT[],
  capacity INT CHECK (capacity >= 0 ),
  operational BOOLEAN NOT NULL DEFAULT FALSE
);
