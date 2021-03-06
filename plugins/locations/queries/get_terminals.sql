SELECT DISTINCT t.id, t.*,
c1.id AS owner_id, c1.name AS owner_name,
c2.id AS operator_id, c2.name AS operator_name
FROM web.terminals t
JOIN web.locations l ON l.ref_id = t.id AND l.type = t.type
JOIN web.companies c1 ON t.owner_id = c1.id
JOIN web.companies c2 ON t.operator_id = c2.id
ORDER BY t.name ASC;
/*
WHERE l.id IN (
  (SELECT origin_id AS id FROM web.segments) UNION (SELECT destination_id AS id FROM web.segments)
);
*/
