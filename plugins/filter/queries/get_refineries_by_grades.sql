SELECT r.* FROM web.refineries r
JOIN web.locations l ON l.ref_id = r.id AND l.type = r.type
WHERE l.id IN (
  (SELECT DISTINCT m.origin_id AS id FROM web.movements m WHERE m.grade_id = ANY ($1))
  UNION
  (SELECT DISTINCT m.destination_id AS id FROM web.movements m WHERE m.grade_id = ANY ($1))
);
