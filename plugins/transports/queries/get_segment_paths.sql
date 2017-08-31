SELECT p.*,
l3.name AS origin_name,
l4.name AS destination_name,
s.name AS segment_name, s.origin_name AS segment_origin_name, s.destination_name AS segment_destination_name
FROM web.paths p
JOIN web.locations l1 ON p.origin_id = l1.id
JOIN web.locations l2 ON p.destination_id = l2.id
JOIN web.locations_v AS l3 ON l1.ref_id = l3.ref_id AND l1.type = l3.type
JOIN web.locations_v AS l4 ON l2.ref_id = l4.ref_id AND l2.type = l4.type
JOIN web.segments_v s ON p.segment_id = s.id
WHERE p.segment_id = $1;
