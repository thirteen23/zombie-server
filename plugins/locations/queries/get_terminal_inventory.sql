SELECT * FROM web.inventory_actual
WHERE terminal_id = $1
AND grade_id = $2
AND day = $3
