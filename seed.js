const redis = require('redis');
const config = require('config');
const StreamArray = require('stream-json/utils/StreamArray');
const fs = require('fs');
const rbush = require('rbush');
const { contains, compose, head, tail, length, is, equals, concat } = require('ramda');
const uuidv1 = require('uuid/v1');

const S = require('./sanctuary');

const { curry2 } = S;

const client = redis.createClient(config.get('redis'));

const tree = rbush(5);

// locationBounds :: Location -> Bounds
const locationBounds = (location) => {
  return {
    minX: location.latitude,
    minY: location.longitude,
    maxX: location.latitude,
    maxY: location.longitude,
    type: location.locationType.toLowerCase(),
    id: location.id
  };
}

const iPipelineBounds = (pipeline) => {
  const bounds = {
    minX: Infinity,
    maxX: -Infinity,
    minY: Infinity,
    maxY: -Infinity,
    type: pipeline.transportType.toLowerCase(),
    id: pipeline.id
  };
  const segments = pipeline.segments;
  for (let i = 0; i < segments.length; i++) {
    let segment = pipeline.segments[i];
    for (let j = 0; j < segment.coordinates.length; j++) {
      let coordinates = segment.coordinates[j];
      for (let k = 0; k < coordinates.length; k++) {
        let coords = coordinates[k];
        bounds.minX = Math.min(coords[0], bounds.minX);
        bounds.maxX = Math.max(coords[0], bounds.maxX);
        bounds.minY = Math.min(coords[1], bounds.minY);
        bounds.maxY = Math.max(coords[1], bounds.maxY);
      }
    }
  }
  return bounds;
}

fs.readdir('./seed', (err, items) => {
  let streams = items.length;
  items.forEach((filename) => {
    const stream = StreamArray.make();
    const type = filename.replace('.json', '');
    stream.output.on('data', (location) => {
      if (contains(type, ['terminals', 'refineries'])) {
        const id = location.value.locationId;
        const loc = Object.assign(location.value, {id});
        const bounds = locationBounds(loc);
        tree.insert(bounds);
        client.hset(type, loc.id, JSON.stringify(Object.assign(loc, bounds)));
      } else {
        const uuid = uuidv1();
        const pipeline = Object.assign(location.value, {id: uuid});
        const bounds = iPipelineBounds(pipeline);
        tree.insert(bounds);
        client.hset(type, pipeline.id, JSON.stringify(Object.assign(pipeline, bounds)));
      }
    });
    stream.output.on('end', () => {
      streams--;
      if (streams === 0) {
        const result = tree.search({
          minX: 35.5,
          maxX: 36.5,
          minY: -96.5,
          maxY: -95.5
        });
        client.set('rtree', JSON.stringify(tree.toJSON()));
        process.exit();
      }
    });
    fs.createReadStream(`./seed/${filename}`).pipe(stream.input);
  });
});
