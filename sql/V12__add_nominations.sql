-- Dynamic
CREATE TABLE web.nominations (
  id SERIAL PRIMARY KEY,
  segment_id INT REFERENCES web.segments(id) NOT NULL,
  grade_id INT REFERENCES web.grades(id) NOT NULL,
  start DATE NOT NULL CHECK (start < stop),
  stop DATE NOT NULL CHECK (stop > start),
  contracted_volume INT CHECK (contracted_volume > 0),
  nominated_min INT CHECK (nominated_min > 0),
  nominated_max INT CHECK (nominated_max > 0),
  tariff_min INT CHECK (tariff_min > 0),
  tariff_max INT CHECK (tariff_max > 0)
);
