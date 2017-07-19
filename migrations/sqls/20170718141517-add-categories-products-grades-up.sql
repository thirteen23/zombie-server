CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  category_id INT REFERENCES categories(id)
);

CREATE TABLE grades (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  product_id INT REFERENCES products(id),
  product_group VARCHAR(2),
  active BOOLEAN
);
