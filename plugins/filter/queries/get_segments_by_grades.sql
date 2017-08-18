SELECT s.id FROM web.segments s
WHERE s.origin_id IN (
  (SELECT DISTINCT m.origin_id AS id FROM web.movements m WHERE m.grade_id = ANY ($1))
  UNION
  (SELECT DISTINCT m.destination_id AS id FROM web.movements m WHERE m.grade_id = ANY ($1))
)
OR s.destination_id IN (
  (SELECT DISTINCT m.origin_id AS id FROM web.movements m WHERE m.grade_id = ANY ($1))
  UNION
  (SELECT DISTINCT m.destination_id AS id FROM web.movements m WHERE m.grade_id = ANY ($1))
)
