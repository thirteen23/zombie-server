CREATE TABLE web.categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE web.products (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  category_id INT REFERENCES web.categories(id)
);

CREATE TABLE web.grades (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  product_id INT REFERENCES web.products(id),
  product_group VARCHAR(2),
  active BOOLEAN
);
