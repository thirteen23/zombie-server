const Server = require('./index');

Server((err, server) => {
  err ? console.error(err)
    : server.start((err) => {
      err ? console.error(err) : console.log('Server started =>', server.info.uri);
    });
});
