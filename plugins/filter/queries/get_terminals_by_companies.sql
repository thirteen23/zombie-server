SELECT t.id
FROM web.terminals t
WHERE (t.owner_id = ANY ($1) OR t.operator_id = ANY ($1));
