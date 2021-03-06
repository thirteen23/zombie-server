-- Dynamic
CREATE TABLE web.pipeline_movements (
  id SERIAL PRIMARY KEY,
  path_id INT REFERENCES web.paths(id) NOT NULL,
  grade_id INT REFERENCES web.grades(id) NOT NULL,
  volume INT NOT NULL CHECK (volume >= 0),
  status web.movement_status,
  transaction VARCHAR,
  origin_start TIMESTAMP WITH TIME ZONE CHECK (origin_start < origin_end),
  origin_end TIMESTAMP WITH TIME ZONE CHECK (origin_end > origin_start),
  destination_start TIMESTAMP WITH TIME ZONE CHECK (destination_start < destination_end),
  destination_end TIMESTAMP WITH TIME ZONE CHECK (destination_end > destination_start),
  pump_rate INT CHECK (pump_rate >= 0)
);
