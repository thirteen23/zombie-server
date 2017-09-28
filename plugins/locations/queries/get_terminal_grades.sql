SELECT DISTINCT g.id, g.name FROM web.inventory_actual r
JOIN web.grades g ON r.grade_id = g.id
WHERE r.terminal_id = $1;
