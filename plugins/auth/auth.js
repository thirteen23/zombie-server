const path = require('path');
const S = require(rootDir + '/sanctuary');
const { node, tryP } = require('fluture');

const { curry3, equals } = S;

// setCode :: DB -> uuid -> String
exports.setCode = curry3((client, uuid, code) => {
  return node((done) => {
    client.set(uuid, code, (value) => {
      done(value);
    });
  });
});

// sendCode :: Twilio -> String -> String -> Future
exports.sendCode = curry3((client, phone, code) => {
  return tryP(() => {
    return client.messages.create({
      body: `Your Bayzyen verification code is: ${code}`,
      from: '+17377779252',
      to: phone
    })
      .then(msg => msg)
      .catch(err => err);
  });
});

// verifyCode :: DB -> uuid -> String -> Future Boolean
exports.verifyCode = curry3((client, uuid, code) => {
  return node((done) => {
    client.get(uuid, (err, val) => {
      done(err, equals(val, code));
    });
  });
});
