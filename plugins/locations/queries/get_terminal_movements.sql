SELECT m.* FROM web.terminals t
JOIN web.locations l ON l.ref_id = t.id AND l.type = t.type
JOIN web.movements m ON m.origin_id = l.id OR m.destination_id = l.id
JOIN web.grades g ON m.grade_id = g.id
WHERE t.id = $1
AND m.grade_id = $2
AND m.day BETWEEN $3 AND $4;
