CREATE TYPE web.movement_type AS ENUM ('adjustments', 'reconsignment', 'trading');

CREATE TABLE web.movements (
  id SERIAL PRIMARY KEY,
  origin_id INT REFERENCES web.locations(id),
  destination_id INT REFERENCES web.locations(id),
  type web.movement_type,
  day DATE,
  grade_id INT REFERENCES web.grades(id),
  schedule_date DATE,
  volume INT,
  committed BOOLEAN
);
