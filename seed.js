const redis = require('redis');
const config = require('config');
const StreamArray = require('stream-json/utils/StreamArray');
const fs = require('fs');
const { head, tail, length, is, equals, concat } = require('ramda');

const client = redis.createClient(config.get('redis'));

fs.readdir('./seed', (err, items) => {
  let streams = items.length;
  items.forEach((filename) => {
    const stream = StreamArray.make();
    const type = filename.replace('.json', '');
    stream.output.on('data', (location) => {
      client.lpush(type, JSON.stringify(location.value));
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
