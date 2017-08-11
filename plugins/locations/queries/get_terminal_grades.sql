SELECT DISTINCT g.id, g.name FROM web.rundowns r
JOIN web.grades g ON r.grade_id = g.id
WHERE r.terminal_id = $1;
