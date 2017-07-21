CREATE TABLE tanks (
  id SERIAL PRIMARY KEY,
  terminal_id INT REFERENCES terminals(id),
  grade_id INT REFERENCES grades(id),
  status STATUS
);
