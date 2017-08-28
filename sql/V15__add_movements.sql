CREATE TYPE web.movement_type AS ENUM ('adjustment', 'reconsignment', 'trade', 'transfer', 'exchange');
CREATE type web.movement_status AS ENUM ('planned', 'scheduled', 'nomination', 'actual');

CREATE TABLE web.movements (
  id SERIAL PRIMARY KEY,
  transaction VARCHAR,
  nomination_period_id INT REFERENCES web.nomination_periods(id) NOT NULL,
  path_id INT references web.paths(id) NOT NULL,
  grade_id INT REFERENCES web.grades(id) NOT NULL,
  type web.movement_type NOT NULL,
  volume INT NOT NULL CHECK (volume >= 0),
  start TIMESTAMP WITH TIME ZONE NOT NULL CHECK (start < stop),
  stop TIMESTAMP WITH TIME ZONE NOT NULL CHECK (stop > start),
  status web.movement_status NOT NULL
);
