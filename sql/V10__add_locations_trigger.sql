/*
CREATE OR REPLACE FUNCTION web.populate_locations()
  RETURNS trigger AS
$populate_locations$
BEGIN
  INSERT INTO web.locations (ref_id, type) VALUES (NEW.id, NEW.type);
  RETURN NEW;
  END;
$populate_locations$ LANGUAGE plpgsql;

CREATE TRIGGER refineries_locations
  BEFORE INSERT
  ON web.refineries
  FOR EACH ROW
  EXECUTE PROCEDURE web.populate_locations();

CREATE TRIGGER stations_locations
  BEFORE INSERT
  ON web.stations
  FOR EACH ROW
  EXECUTE PROCEDURE web.populate_locations();

CREATE TRIGGER terminals_locations
  BEFORE INSERT
  ON web.terminals
  FOR EACH ROW
  EXECUTE PROCEDURE web.populate_locations();
*/
