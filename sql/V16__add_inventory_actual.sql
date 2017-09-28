-- Dynamic
CREATE TABLE web.inventory_actual (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  terminal_id INT REFERENCES web.terminals(id) NOT NULL,
  grade_id INT REFERENCES web.grades(id) NOT NULL,
  day DATE NOT NULL,
  opening_stock INT NOT NULL,
  volume_in INT NOT NULL DEFAULT 0,
  volume_out INT NOT NULL DEFAULT 0,
  closing_stock INT NOT NULL,
  receipts INT NOT NULL DEFAULT 0,
  shipments INT NOT NULL DEFAULT 0,
  rack_liftings INT NOT NULL DEFAULT 0,
  transfers_in INT NOT NULL DEFAULT 0,
  transfers_out INT NOT NULL DEFAULT 0,
  exchange_in INT NOT NULL DEFAULT 0,
  exchange_out INT NOT NULL DEFAULT 0,
  regrade_in INT NOT NULL DEFAULT 0,
  regrade_out INT NOT NULL DEFAULT 0,
  gain_loss INT NOT NULL DEFAULT 0
);
