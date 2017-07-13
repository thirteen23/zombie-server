const {head, tail, map} = require('ramda');

// swallowKey :: Array -> Object
const swallowKey = (arr) => Object.assign(JSON.parse(tail(arr)), {id: head(arr)});

// objToArray :: Object -> Array
exports.objToArray = (obj) => {
  return map(swallowKey, Object.entries(obj));
};
