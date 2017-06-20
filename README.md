# BAYZYEN

### Development

`$ NODE_ENV=dev npm start`

### Database (Development)

```sh
$ redis-cli
127.0.0.1:6379> flushall
127.0.0.1:6379> quit
$ node seed.js
```

### Testing

`$ npm test`

### Linting

`$ npm run lint`

### Staging

`$ now -e NODE_ENV=stg --docker`
