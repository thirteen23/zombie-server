const { is, isNil, map } = require('ramda');

// intArray :: a -> [Int]
exports.intArray = (a) => {
  if (isNil(a)) return [];
  return is(String, a) ? [parseInt(a, 10)] : map(str => parseInt(str, 10), a);
};
