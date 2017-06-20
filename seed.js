const redis = require('redis');
const config = require('config');
const client = redis.createClient(config.get('redis'));

new Array('terminals', 'refineries').forEach((type) => {
  require(`./seed/${type}.json`).forEach((location) => {
    client.lpush(type, JSON.stringify(location));
  });
});
