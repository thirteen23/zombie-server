-- Dynamic
CREATE TABLE web.nominations (
  id SERIAL PRIMARY KEY,
  path_id INT REFERENCES web.paths(id) NOT NULL,
  grade_id INT REFERENCES web.grades(id) NOT NULL,
  contracted_volume INT,
  nominated_min INT,
  nominated_max INT,
  tariff_min INT,
  tariff_max INT,
  start DATE NOT NULL CHECK (start < "end"),
  "end" DATE NOT NULL CHECK ("end" > start)
);
