SELECT DISTINCT p.*
FROM web.products p
WHERE p.category_id = $1
AND p.id IN (
  SELECT web.grades.product_id FROM web.grades WHERE web.grades.active IS TRUE
)
