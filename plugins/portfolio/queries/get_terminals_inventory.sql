SELECT *
FROM web.inventory_actual
WHERE grade_id = $1
AND terminal_id = ANY ($2)
AND day BETWEEN $3 AND $4
ORDER BY day ASC, terminal_id ASC, grade_id ASC;
