SELECT r.* FROM web.terminals t
JOIN web.rundowns r ON r.terminal_id = t.id
WHERE t.id = $1
AND r.grade_id = $2
AND r.day BETWEEN date_trunc('month', current_date - interval '1' month) AND NOW();
