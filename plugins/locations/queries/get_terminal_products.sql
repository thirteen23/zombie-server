SELECT DISTINCT p.id, p.name FROM web.tanks t
JOIN web.grades g ON t.grade_id = g.id
JOIN web.products p ON g.product_id = p.id
WHERE t.terminal_id = $1;
