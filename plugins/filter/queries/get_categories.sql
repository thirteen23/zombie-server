SELECT DISTINCT c.*
FROM web.categories c
JOIN web.products p ON p.category_id = c.id
WHERE c.id IN (
  SELECT web.products.category_id FROM web.products
) AND p.id IN (
  SELECT web.grades.product_id FROM web.grades WHERE web.grades.active IS TRUE
)
