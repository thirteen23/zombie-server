SELECT DISTINCT (f.terminal_id, f.grade_id, f.day), f.*
FROM web.forecasted_rundowns f
WHERE f.terminal_id = $1
AND f.grade_id = $2
AND f.day > '20170530'
ORDER BY f.created_at DESC
LIMIT 11;
