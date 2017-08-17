SELECT DISTINCT s.id, s.* FROM web.stations s
JOIN web.locations l ON l.ref_id = s.id AND l.type = s.type
WHERE l.id IN (
  (SELECT origin_id AS id FROM web.segments) UNION (SELECT destination_id AS id FROM web.segments)
)
ORDER BY s.name ASC;
