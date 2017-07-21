CREATE table pipelines (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  owner_id INT REFERENCES companies(id),
  operator_id INT REFERENCES companies(id)
);
