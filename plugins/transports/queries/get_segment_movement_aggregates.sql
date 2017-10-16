SELECT pm.path_id, pm.grade_id, pm.destination_end, pm.volume,
p.id AS product_id,
c.id AS category_id
FROM web.pipeline_movements pm
JOIN web.grades g ON pm.grade_id = g.id
JOIN web.products p ON g.product_id = p.id
JOIN web.categories c ON p.category_id = c.id
WHERE pm.path_id IN (SELECT id FROM web.paths WHERE segment_id = $1)
AND pm.destination_end BETWEEN $2 AND $3
ORDER BY pm.destination_end;
