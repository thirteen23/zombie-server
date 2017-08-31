SELECT DISTINCT start, "end"
FROM web.nominations
WHERE path_id IN (SELECT id FROM web.paths WHERE segment_id = $1)
ORDER BY "end" ASC;
