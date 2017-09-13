SELECT pm.*,
g.name AS grade_name,
l3.name AS origin_name,
l4.name AS destination_name
FROM web.pipeline_movements pm
JOIN web.paths p ON pm.path_id = p.id
JOIN web.grades g ON pm.grade_id = g.id
JOIN web.products pr ON g.product_id = pr.id
JOIN web.categories c ON pr.category_id = c.id
JOIN web.locations l1 ON p.origin_id = l1.id
JOIN web.locations l2 ON p.destination_id = l2.id
JOIN web.locations_v l3 ON l1.ref_id = l3.ref_id AND l1.type = l3.type
JOIN web.locations_v l4 ON l2.ref_id = l4.ref_id AND l2.type = l4.type
WHERE pm.path_id = $1
AND "end" BETWEEN $2 AND $3;
