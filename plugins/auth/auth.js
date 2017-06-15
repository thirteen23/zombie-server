const { Left, Right, curry2 }= require('sanctuary');
const Joi = require('joi');

// SCHEMA
const schema = Joi.object().keys({
  username: Joi.string(),
  email: Joi.string().email(),
});

/* joiError :: Object -> Error */
const joiError = (error) => {
  return new Error(error.message);
};

/* joiValid :: Schema -> Object -> Either Boolean [Error] */
const joiValid = (schema, value) => {
  const validation = Joi.validate(value, schema);
  return (validation.error === null) ? Left(true)
    : Right(validation.error.details.map(joiError));
};

/* userValid :: Object -> Either Boolean [Error] */
const userValid = curry2(joiValid)(schema);

module.exports = {
  userValid
};
