const redis = require('redis');
const config = require('config');
const client = redis.createClient(config.get('redis'));

new Array('terminals', 'refineries').forEach((type) => {
  const json = require(`./seed/${type}.json`);
  Object.keys(json).forEach((key) => {
    client.hset(type, key, JSON.stringify(json[key]));
  });
});

