CREATE VIEW locations_v AS

SELECT refineries.id AS ref_id,
refineries.type,
refineries.name,
refineries.longitude,
refineries.latitude
FROM web.refineries

UNION

SELECT stations.id AS ref_id,
stations.type,
stations.name,
stations.longitude,
stations.latitude
FROM web.stations

UNION

SELECT terminals.id AS ref_id,
terminals.type,
terminals.name,
terminals.longitude,
terminals.latitude
FROM web.terminals;
