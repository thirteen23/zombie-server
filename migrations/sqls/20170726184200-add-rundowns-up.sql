CREATE TABLE web.rundowns (
  id SERIAL PRIMARY KEY,
  terminal_id INT REFERENCES web.terminals(id) NOT NULL,
  grade_id INT REFERENCES web.grades(id) NOT NULL,
  day DATE NOT NULL,
  volume_in INT,
  volume_out INT,
  opening_stock INT,
  closing_stock INT,
  trading INT,
  receipts INT,
  exchange INT,
  liftings INT,
  reconsignment INT,
  adjustment INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
