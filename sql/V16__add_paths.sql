CREATE TABLE web.paths {
  id SERIAL PRIMARY KEY,
  origin_id INT REFERENCES web.locations(id) NOT NULL,
  destination_id INT REFERENCES web.locations(id) NOT NULL,
  segment_id INT REFERENCES web.segments(id) NOT NULL
}
