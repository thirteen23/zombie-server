SELECT grade_id, day FROM (
  SELECT day, grade_id, closing_stock FROM web.inventory_actual WHERE terminal_id = $1 AND grade_id = $2
    UNION
  SELECT day, grade_id, closing_stock FROM web.inventory_forecast WHERE terminal_id = $1 AND grade_id = $2
) AS inventory
WHERE closing_stock < (SELECT SUM(operating_min_volume) FROM web.tanks WHERE terminal_id = $1 AND grade_id = $2)
AND day BETWEEN $3 AND $4
ORDER BY day ASC
LIMIT 1;
