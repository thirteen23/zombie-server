(SELECT DISTINCT p.id, p.name, 'inbound' as direction FROM web.pipelines p
JOIN web.segments s ON s.pipeline_id = p.id
JOIN web.locations l ON s.destination_id = l.id
JOIN web.terminals t ON l.ref_id = t.id
WHERE l.type = 'terminal' AND t.id = $1)

UNION

(SELECT DISTINCT p.id, p.name, 'outbound' AS direction FROM web.pipelines p
JOIN web.segments s ON s.pipeline_id = p.id
JOIN web.locations l ON s.origin_id = l.id
JOIN web.terminals t ON l.ref_id = t.id
WHERE l.type = 'terminal' AND t.id = $1)
