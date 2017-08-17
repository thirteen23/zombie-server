SELECT r.*,
c1.id AS owner_id, c1.name AS owner_name,
c2.id AS operator_id, c2.name AS operator_name
FROM web.refineries r
JOIN web.locations l ON l.ref_id = r.id
JOIN web.companies c1 ON r.owner_id = c1.id
JOIN web.companies c2 ON r.operator_id = c2.id
WHERE (r.owner_id = ANY ($1) OR r.operator_id = ANY ($1));
