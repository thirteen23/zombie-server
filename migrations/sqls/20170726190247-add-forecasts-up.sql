CREATE TABLE web.forecasted_rundowns (
  id SERIAL PRIMARY KEY,
  terminal_id INT REFERENCES web.terminals(id) NOT NULL,
  grade_id INT REFERENCES web.grades(id) NOT NULL,
  day DATE NOT NULL,
  confidence REAL NOT NULL,
  closing_stock INT,
  closing_stock_low INT,
  closing_stock_high INT,
  created_at TIMESTAMP DEFAULT NOW()
);
