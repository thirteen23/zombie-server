SELECT s.*,
p.name AS pipeline_name,
c1.name AS owner_name, c1.id AS owner_id,
c2.name AS operator_name, c2.id AS operator_id
FROM web.segments s
JOIN web.pipelines p ON s.pipeline_id = p.id
JOIN web.companies c1 ON p.owner_id = c1.id
JOIN web.companies c2 ON p.operator_id = c2.id;
