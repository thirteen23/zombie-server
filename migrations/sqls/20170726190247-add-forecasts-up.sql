CREATE TABLE web.forecasted_rundowns (
  id SERIAL PRIMARY KEY,
  terminal_id INT REFERENCES web.terminals(id) NOT NULL,
  grade_id INT REFERENCES web.grades(id) NOT NULL,
  day DATE NOT NULL,
  confidence REAL NOT NULL,
  closing_stock INT,
  closing_stock_low_90 INT,
  closing_stock_high_90 INT,
  closing_stock_low_95 INT,
  closing_stock_high_95 INT,
  created_at TIMESTAMP DEFAULT NOW()
);
