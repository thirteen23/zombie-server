SELECT day,
Cast(Sum(closing_stock) AS Integer) AS closing_stock
FROM web.forecasted_rundowns
WHERE day BETWEEN $1 AND $2
AND terminal_id IN (549, 566)
GROUP BY day
ORDER BY day ASC;
