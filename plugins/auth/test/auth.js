const Lab = require('lab');
const Code = require('code');
const uuidv1 = require('uuid/v1');
const validate = require('uuid-validate');

const lab = exports.lab = Lab.script();
const expect = Code.expect;
const describe = lab.describe;
const it = lab.it;
const before = lab.before;

const {setCode} = require('../auth');

let server;
let uuid;
let code;

before((done) => {
  require('../../../index')((err, serv) => {
    server = serv;
    uuid = uuidv1();
    code = '1234';
    setCode(server.redis, uuid, code)
      .fork((err) => console.error, (res) => done());
  });
});

describe('impure functions', () => {
  it('/authenticate', (done) => {
    server.inject({
      method: 'POST',
      url: '/authenticate',
      payload: {
        identifier: '+12159090921',
        password: 'password',
      },
    }, (res) => {
      expect(res.statusCode).to.equal(200);
      expect(validate(res.result)).to.be.true();
      done();
    });
  });
  it('/verify', (done) => {
    server.inject({
      method: 'POST',
      url: '/verify',
      payload: {
        uuid,
        code,
      },
    }, (res) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
