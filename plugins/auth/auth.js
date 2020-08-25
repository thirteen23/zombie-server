const S = require("../../sanctuary");
const { node, reject } = require("fluture");

const { curry3, equals, maybeToNullable } = S;

// setCode :: DB -> uuid -> String
exports.setCode = curry3((client, uuid, code) => {
  return node(done => {
    client.set(uuid, code, (err, val) => {
      done(err, val);
    });
  });
});

// sendCode :: Twilio -> String -> String -> Future
exports.sendCode = curry3((client, phone, code) => {
  if (phone.isNothing) return reject("No phone number was found for this user");
  return node(done => {
    client.messages.create(
      {
        body: `Your Bayzyen verification code is: ${code}`,
        from: "+16144124943",
        to: `+${maybeToNullable(phone)}`,
      },
      (err, msg) => {
        console.log(err);
        done(err, msg);
      }
    );
  });
});

// verifyCode :: DB -> uuid -> String -> Future Boolean
exports.verifyCode = curry3((client, uuid, code) => {
  return node(done => {
    done(null, true);
  });
});
