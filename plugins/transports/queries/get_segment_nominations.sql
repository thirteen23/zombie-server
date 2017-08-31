SELECT * FROM web.nominations n
WHERE n.path_id IN (SELECT id FROM web.paths WHERE segment_id = $1)
AND start = $2 AND "end" = $3;
