const $ = require('sanctuary-def');

// Latitude :: Type
const Latitude = $.NullaryType(
  'locations/Latitude',
  '',
  x => typeof x === 'number' && x >= -90 && x <= 90
);

// Longitude :: Type
const Longitude = $.NullaryType(
  'locations/Longitude',
  '',
  x => typeof x === 'number' && x >= -180 && x <= 180
);

// Location :: Type
const Location = $.RecordType({
  latitude: Latitude,
  longitude: Longitude,
});
