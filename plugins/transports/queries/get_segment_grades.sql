SELECT DISTINCT grade_id AS id,
g.name AS name,
p.id AS product_id, p.name AS product_name,
c.id AS category_id, c.name AS category_name
FROM web.pipeline_movements pm
JOIN web.grades g ON pm.grade_id = g.id
JOIN web.products p ON g.product_id = p.id
JOIN web.categories c ON p.category_id = c.id
WHERE path_id IN (SELECT id FROM web.paths WHERE segment_id = $1);
