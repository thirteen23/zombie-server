CREATE VIEW segments_v AS

SELECT s.id,
s.name,
s.pipeline_id,
s.origin_id,
s.destination_id,
s.coordinates,
s.length,
s.diameter,
s.capacity,
s.operational,
p.name AS pipeline_name,
c1.name AS owner_name,
c2.name AS operator_name,
l3.longitude AS origin_longitude,
l3.latitude AS origin_latitude,
l3.name AS origin_name,
l4.longitude AS destination_longitude,
l4.latitude AS destination_latitude,
l4.name AS destination_name
FROM web.segments s
JOIN web.locations l1 ON s.origin_id = l1.id
JOIN web.locations l2 ON s.destination_id = l2.id
JOIN web.pipelines p ON s.pipeline_id = p.id
JOIN web.companies c1 ON p.owner_id = c1.id
JOIN web.companies c2 ON p.operator_id = c2.id
JOIN web.locations_v l3 ON l1.ref_id = l3.ref_id AND l1.type::text = l3.type::text
JOIN web.locations_v l4 ON l2.ref_id = l4.ref_id AND l2.type::text = l4.type::text
ORDER BY s.name;
