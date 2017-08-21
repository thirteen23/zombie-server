CREATE table web.pipelines (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  owner_id INT REFERENCES web.companies(id) NOT NULL,
  operator_id INT REFERENCES web.companies(id) NOT NULL
);
