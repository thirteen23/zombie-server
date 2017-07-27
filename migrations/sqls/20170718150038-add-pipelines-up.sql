CREATE table web.pipelines (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  owner_id INT REFERENCES web.companies(id),
  operator_id INT REFERENCES web.companies(id)
);
