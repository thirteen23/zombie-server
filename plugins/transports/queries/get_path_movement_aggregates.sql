SELECT path_id, grade_id, "end", volume
FROM web.pipeline_movements
WHERE path_id = $1
AND "end" BETWEEN $2 AND $3;
