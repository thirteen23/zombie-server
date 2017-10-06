SELECT r.* FROM web.terminals t
JOIN web.inventory_actual r ON r.terminal_id = t.id
WHERE t.id = $1
AND r.grade_id = $2
AND r.day BETWEEN $3 AND $4
ORDER BY r.day ASC;
