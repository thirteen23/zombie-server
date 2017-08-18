SELECT r.id
FROM web.refineries r
WHERE (r.owner_id = ANY ($1) OR r.operator_id = ANY ($1));
