-- Dynamic
CREATE TABLE web.nominations (
  id SERIAL PRIMARY KEY,
  path_id INT REFERENCES web.paths(id) NOT NULL,
  grade_id INT REFERENCES web.grades(id) NOT NULL,
  start DATE NOT NULL CHECK (start < end),
  end DATE NOT NULL CHECK (end > start),
  contracted_volume INT CHECK (contracted_volume > 0),
  nominated_min INT CHECK (nominated_min > 0),
  nominated_max INT CHECK (nominated_max > 0),
  tariff_min INT CHECK (tariff_min > 0),
  tariff_max INT CHECK (tariff_max > 0)
);
