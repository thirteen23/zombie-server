CREATE TABLE tanks (
  id SERIAL PRIMARY KEY,
  refinery_id INT REFERENCES refineries(id),
  terminal_id INT REFERENCES terminals(id),
  product_id INT REFERENCES products(id),
  status STATUS,
  min_bbls INT,
  max_bbls INT,
  target_bbls INT
);
