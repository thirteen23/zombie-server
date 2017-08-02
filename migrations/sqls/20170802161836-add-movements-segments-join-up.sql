CREATE TABLE web.movements_segments (
  id SERIAL PRIMARY KEY,
  movement_id INT REFERENCES web.movements(id),
  segment_id INT REFERENCES web.segments(id)
);
