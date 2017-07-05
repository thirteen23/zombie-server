const redis = require('redis');
const config = require('config');
const StreamArray = require('stream-json/utils/StreamArray');
const fs = require('fs');
const { head, tail, length, is, equals, concat } = require('ramda');

const client = redis.createClient(config.get('redis'));

const recur = (arr) => {
  if (equals(length(arr), 0)) {
    return [];
  }
  if (is(Object, head(arr))) {
    return concat([recur(head(arr))], recur(tail(arr)));
  }
  if (is(Number, head(arr))) {
    return [arr[1], arr[0]];
  }
}

fs.readdir('./seed', (err, items) => {
  let streams = items.length;
  items.forEach((filename) => {
    const stream = StreamArray.make();
    const type = filename.replace('.json', '');
    stream.output.on('data', (location) => {
      if (type === 'pipelines') {
        location.value.segments.forEach((segment) => {
          segment.coordinates = recur(segment.coordinates);
        });
        client.lpush(type, JSON.stringify(location.value));
      } else {
        client.lpush(type, JSON.stringify(location));
      }
    });
    stream.output.on('end', () => {
      streams--;
      if (streams === 0) {
        process.exit();
      }
    });
    fs.createReadStream(`./seed/${filename}`).pipe(stream.input);
  });
});
