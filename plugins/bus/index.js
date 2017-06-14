const EventEmitter2 = require('eventemitter2').EventEmitter2;

exports.register = (server, options, next) => {
  server.decorate('server', 'bus', new EventEmitter2());
  next();
};

exports.register.attributes = {name: 'bus'};
