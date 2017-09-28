-- Terminals
((SELECT DISTINCT(grade_id) AS id, g.name AS name
FROM web.inventory_actual AS r
JOIN web.grades AS g ON r.grade_id = g.id
WHERE r.terminal_id = ANY ($2))

UNION

-- Segments
(SELECT DISTINCT(grade_id) AS id, g.name AS name
FROM web.pipeline_movements AS pm
JOIN web.grades AS g ON pm.grade_id = g.id
WHERE pm.path_id IN (SELECT id FROM web.paths WHERE segment_id = ANY ($1))))

ORDER BY id;
