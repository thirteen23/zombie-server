SELECT t.id FROM web.terminals t
JOIN web.locations l ON l.ref_id = t.id AND l.type = t.type
AND l.id IN (
  (SELECT DISTINCT m.origin_id AS id FROM web.movements m WHERE m.grade_id = ANY ($1))
  UNION
  (SELECT DISTINCT m.destination_id AS id FROM web.movements m WHERE m.grade_id = ANY ($1))
);
