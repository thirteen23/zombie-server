SELECT DISTINCT g.id, g.name FROM web.tanks t
JOIN web.grades g ON t.grade_id = g.id
WHERE t.terminal_id = $1;
