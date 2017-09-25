SELECT
p.id,
p.name,
p.owner_id,
c1.name AS owner_name,
p.operator_id,
c2.name AS operator_name
FROM web.pipelines p
JOIN web.companies c1 ON p.owner_id = c1.id
JOIN web.companies c2 ON p.operator_id = c2.id;
