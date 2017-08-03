SELECT DISTINCT g.*
FROM web.grades g
JOIN web.products p ON g.product_id = p.id
WHERE p.id = $1
AND g.active IS TRUE
AND p.id IN (
  SELECT web.grades.product_id FROM web.grades WHERE web.grades.active IS TRUE
)
