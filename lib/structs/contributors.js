const utils = require('../utils');

/**
 * Array of contributors.
 */

module.exports = () => ({
  schema: 'array?',
  validate(v) {
    return Array.isArray(v) ? v.every(utils.isStringOrObject) : true;
  },
  parse(values) {
    if (!values) return;
    let parse = require('parse-author');
    let arr = [];
    for (let value of values) {
      if (typeof value === 'string') value = parse(value);
      arr.push(value);
    }
    return arr;
  }
});
