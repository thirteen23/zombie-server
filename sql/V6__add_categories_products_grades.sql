-- Static
CREATE TABLE web.categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL
);

-- Static
CREATE TABLE web.products (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  category_id INT REFERENCES web.categories(id) NOT NULL
);

-- Static
CREATE TABLE web.grades (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  product_id INT REFERENCES web.products(id) NOT NULL,
  product_group VARCHAR(2),
  active BOOLEAN NOT NULL DEFAULT FALSE
);
