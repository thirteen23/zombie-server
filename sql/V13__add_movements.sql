CREATE TYPE web.movement_type AS ENUM ('adjustment', 'reconsignment', 'trade', 'transfer', 'exchange');

-- Dynamic
CREATE TABLE web.movements (
  id SERIAL PRIMARY KEY,
  transaction VARCHAR,
  origin_id INT REFERENCES web.locations(id) NOT NULL,
  destination_id INT REFERENCES web.locations(id) NOT NULL,
  grade_id INT REFERENCES web.grades(id) NOT NULL,
  type web.movement_type,
  volume INT NOT NULL CHECK (volume >= 0),
  origin_start TIMESTAMP WITH TIME ZONE CHECK (origin_start < origin_end),
  origin_end TIMESTAMP WITH TIME ZONE CHECK (origin_end > origin_start),
  destination_start TIMESTAMP WITH TIME ZONE CHECK (destination_start < destination_end),
  destination_end TIMESTAMP WITH TIME ZONE CHECK (destination_end > destination_start)
);
