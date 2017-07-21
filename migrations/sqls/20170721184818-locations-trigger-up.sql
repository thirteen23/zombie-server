CREATE OR REPLACE FUNCTION populate_locations()
  RETURNS trigger AS
$populate_locations$
BEGIN
  INSERT INTO locations (ref_id, type) VALUES (NEW.id, NEW.type);
  RETURN NEW;
  END;
$populate_locations$ LANGUAGE plpgsql;

CREATE TRIGGER refineries_locations
  BEFORE INSERT
  ON refineries
  FOR EACH ROW
  EXECUTE PROCEDURE populate_locations();

CREATE TRIGGER stations_locations
  BEFORE INSERT
  ON stations
  FOR EACH ROW
  EXECUTE PROCEDURE populate_locations();

CREATE TRIGGER terminals_locations
  BEFORE INSERT
  ON terminals
  FOR EACH ROW
  EXECUTE PROCEDURE populate_locations();
