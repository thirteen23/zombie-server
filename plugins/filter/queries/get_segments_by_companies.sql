SELECT s.id
FROM web.segments s
JOIN web.locations l1 ON s.origin_id = l1.id
JOIN web.locations l2 ON s.destination_id = l2.id
JOIN web.pipelines p ON s.pipeline_id = p.id
JOIN (
(SELECT id, type, name, longitude, latitude FROM web.refineries)
UNION (SELECT id, type, name, longitude, latitude FROM web.stations)
UNION (SELECT id, type, name, longitude, latitude FROM web.terminals)
) AS l3
ON l1.ref_id = l3.id AND l1.type = l3.type
JOIN (
(SELECT id, type, name, longitude, latitude FROM web.refineries)
UNION (SELECT id, type, name, longitude, latitude FROM web.stations)
UNION (SELECT id, type, name, longitude, latitude FROM web.terminals)
) AS l4
ON l2.ref_id = l4.id AND l2.type = l4.type
WHERE (p.owner_id = ANY ($1) OR p.operator_id = ANY ($1));
