CREATE TABLE segments (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  pipeline_id INT REFERENCES pipelines(id),
  origin_id INT REFERENCES locations(id),
  destination_id INT REFERENCES locations(id),
  coordinates LSEG[],
  length INT,
  diameter INT[],
  capacity INT
);
