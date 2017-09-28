SELECT DISTINCT (f.terminal_id, f.grade_id, f.day), f.*
FROM web.inventory_forecast f
WHERE f.terminal_id = $1
AND f.grade_id = $2
AND f.day BETWEEN $3 AND $4
ORDER BY f.created_at DESC;
