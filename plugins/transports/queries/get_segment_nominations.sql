SELECT n.*,
p.id AS product_id,
c.id AS category_id
FROM web.nominations n
JOIN web.grades g ON n.grade_id = g.id
JOIN web.products p ON g.product_id = p.id
JOIN web.categories c ON p.category_id = c.id
WHERE n.path_id IN (SELECT id FROM web.paths WHERE segment_id = $1)
AND n.start = $2 AND n."end" = $3;
