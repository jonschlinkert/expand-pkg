const typeOf = require('kind-of');

exports.isObject = val => typeOf(val) === 'object';

exports.isStringOrObject = val => exports.isObject(val) || typeof val === 'string';

exports.omitEmpty = (obj = {}) => {
  let res = {};
  for (let key of Object.keys(obj)) {
    let val = obj[key];
    if (Array.isArray(val)) {
      val = val.map(v => exports.omitEmpty(v));
      if (val.length) res[key] = val;
      continue;
    }
    if (exports.isObject(val)) {
      val = exports.omitEmpty(val);
    }
    if (val != null) {
      res[key] = val;
    }
  }
  return res;
};
