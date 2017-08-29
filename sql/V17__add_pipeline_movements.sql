-- Dynamic
CREATE TABLE web.pipeline_movements (
  id SERIAL PRIMARY KEY,
  transaction VARCHAR,
  path_id INT REFERENCES web.paths(id) NOT NULL,
  grade_id INT REFERENCES web.grades(id) NOT NULL,
  volume INT NOT NULL CHECK (volume >= 0),
  start TIMESTAMP WITH TIME ZONE NOT NULL CHECK (start < stop),
  stop TIMESTAMP WITH TIME ZONE NOT NULL CHECK (stop > start),
  status web.movement_status NOT NULL
);
