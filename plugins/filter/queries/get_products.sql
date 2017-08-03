SELECT p.*
FROM web.products p
WHERE p.id IN (
  SELECT web.grades.product_id FROM web.grades WHERE web.grades.active IS TRUE
);
