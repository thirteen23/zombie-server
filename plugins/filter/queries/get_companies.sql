SELECT * FROM web.companies WHERE web.companies.id IN (
  (SELECT DISTINCT operator_id FROM web.terminals WHERE operator_id IS NOT NULL)
  UNION
  (SELECT DISTINCT operator_id FROM web.refineries WHERE operator_id IS NOT NULL)
  UNION
  (SELECT DISTINCT p.operator_id FROM web.segments s
  JOIN web.pipelines p ON s.pipeline_id = p.id
  WHERE p.operator_id IS NOT NULL)
);
