SELECT day,
Cast(Sum(closing_stock) AS Integer) AS closing_stock
FROM web.inventory_forecast
WHERE grade_id = $1
AND terminal_id = ANY ($2)
AND day BETWEEN $3 AND $4
GROUP BY day
ORDER BY day ASC;
