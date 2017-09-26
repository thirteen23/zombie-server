CREATE TABLE web.inventory_actual (
  id SERIAL PRIMARY KEY,
  created_at
  updated_at
  terminal_id
  grade_id
  day
  opening_stock
  volume_in
  volume_out
  closing_stock
  receipts
  shipments
  rack_liftings
  transfers_in
  transfers_out
  exchange_in
  exchange_out
  regrade_in
  regrade_out
  gain_loss
  closing_stock_low
  closing_stock_high
)
