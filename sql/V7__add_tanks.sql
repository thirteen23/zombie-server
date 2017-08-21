CREATE TABLE web.tanks (
  id SERIAL PRIMARY KEY,
  terminal_id INT REFERENCES web.terminals(id) NOT NULL,
  grade_id INT REFERENCES web.grades(id),
  operational BOOLEAN NOT NULL DEFAULT FALSE
);
