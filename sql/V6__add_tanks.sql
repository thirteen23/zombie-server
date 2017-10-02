-- Static
CREATE TABLE web.tanks (
  id SERIAL PRIMARY KEY,
  terminal_id INT REFERENCES web.terminals(id) NOT NULL,
  grade_id INT REFERENCES web.grades(id),
  operating_min_volume INT,
  operating_max_volume INT,
  operating_target_volume INT,
  operational BOOLEAN NOT NULL DEFAULT FALSE
);
