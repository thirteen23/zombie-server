SELECT web.refineries.*, c1.name AS owner_name, c2.name AS operator_name FROM web.refineries
JOIN web.companies c1 ON web.refineries.owner_id = c1.id
JOIN web.companies c2 ON web.refineries.operator_id = c2.id
WHERE web.refineries.id = $1;
