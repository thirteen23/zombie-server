CREATE TYPE web.movement_type AS ENUM ('adjustment', 'reconsignment', 'trade', 'transfer', 'exchange');
CREATE type web.movement_status AS ENUM ('planned', 'scheduled', 'nomination', 'actual');

-- Dynamic
CREATE TABLE web.location_movements (
  id SERIAL PRIMARY KEY,
  transaction VARCHAR,
  origin_id INT REFERENCES web.locations(id) NOT NULL,
  destination_id INT REFERENCES web.locations(id) NOT NULL,
  grade_id INT REFERENCES web.grades(id) NOT NULL,
  type web.movement_type NOT NULL,
  volume INT NOT NULL CHECK (volume >= 0),
  start TIMESTAMP WITH TIME ZONE NOT NULL CHECK (start < stop),
  stop TIMESTAMP WITH TIME ZONE NOT NULL CHECK (stop > start),
  status web.movement_status NOT NULL
);
