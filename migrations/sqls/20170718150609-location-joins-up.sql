CREATE TABLE products_refineries (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id),
  refinery_id INT REFERENCES refineries(id)
);

CREATE TABLE products_terminals (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES products(id),
  terminals_id INT REFERENCES terminals(id)
);

CREATE TABLE pipelines_refineries (
  id SERIAL PRIMARY KEY,
  pipeline_id INT REFERENCES pipelines(id),
  refinery_id INT REFERENCES refineries(id)
);

CREATE TABLE pipelines_terminals (
  id SERIAL PRIMARY KEY,
  pipeline_id INT REFERENCES pipelines(id),
  terminal_id INT REFERENCES terminals(id)
);
