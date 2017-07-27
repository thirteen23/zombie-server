SELECT web.terminals.*, c1.name AS owner_name, c2.name AS operator_name FROM web.terminals
JOIN web.companies c1 ON web.terminals.owner_id = c1.id
JOIN web.companies c2 ON web.terminals.operator_id = c2.id
WHERE web.terminals.id = $1;
