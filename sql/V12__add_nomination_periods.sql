CREATE TABLE web.nomination_periods (
  id SERIAL PRIMARY KEY,
  segment_id INT REFERENCES segments(id) NOT NULL,
  grade_id INT REFERENCES grades(id) NOT NULL,
  start TIMESTAMP WITH TIME ZONE NOT NULL CHECK (start < stop),
  stop TIMESTAMP WITH TIME ZONE NOT NULL CHECK (stop > start)
);
