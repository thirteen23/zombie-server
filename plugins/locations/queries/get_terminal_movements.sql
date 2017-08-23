SELECT m.*, g.name AS grade_name, l3.name AS origin_name, l4.name AS destination_name FROM web.movements m
JOIN web.locations l1 ON m.origin_id = l1.id
JOIN web.locations l2 ON m.destination_id = l2.id
JOIN web.grades g ON m.grade_id = g.id
JOIN (
(SELECT id, type, name FROM web.refineries) UNION (SELECT id, type, name FROM web.terminals) UNION (SELECT id, type, name FROM web.stations)
) AS l3
ON l1.ref_id = l3.id AND l1.type = l3.type
JOIN (
(SELECT id, type, name FROM web.refineries) UNION (SELECT id, type, name FROM web.terminals) UNION (SELECT id, type, name FROM web.stations)
) AS l4
ON l2.ref_id = l4.id AND l2.type = l4.type
WHERE ((l3.id = $1 AND l3.type = 'terminal') OR (l4.id = $1 AND l4.type = 'terminal'))
AND m.grade_id = $2
AND m.end BETWEEN $3 AND $4;
