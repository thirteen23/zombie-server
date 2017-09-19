SELECT day,
Cast(Sum(volume_in) AS Integer) AS volume_in,
Cast(Sum(volume_out) AS Integer) AS volume_out,
Cast(Sum(closing_stock) AS Integer) AS closing_stock
FROM web.rundowns
WHERE day BETWEEN $1 AND $2
AND terminal_id IN (549, 566)
GROUP BY day
ORDER BY day ASC;
