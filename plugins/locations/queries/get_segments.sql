SELECT s.*,
p.id AS pipeline_id, p.name AS pipeline_name,
c1.id AS owner_id, c1.name AS owner_name,
c2.id AS operator_id, c2.name AS operator_name,
l3.longitude AS origin_longitude, l3.latitude AS origin_latitude, l3.name AS origin_name,
l4.longitude AS destination_longitude, l4.latitude AS destination_latitude, l4.name AS destination_name
FROM web.segments s
JOIN web.locations l1 ON s.origin_id = l1.id
JOIN web.locations l2 ON s.destination_id = l2.id
JOIN web.pipelines p ON s.pipeline_id = p.id
JOIN web.companies c1 ON p.owner_id = c1.id
JOIN web.companies c2 ON p.operator_id = c2.id
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
ORDER BY s.name ASC;
