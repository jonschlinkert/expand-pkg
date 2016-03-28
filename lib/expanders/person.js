'use strict';

var utils = require('../utils');

/**
 * Stringify a person object, or array of person objects, such as
 * `maintainer`, `collaborator`, `contributor`, and `author`.
 *
 * @param {Object|Array|String} `val` If an object is passed, it will be converted to a string. If an array of objects is passed, it will be converted to an array of strings.
 * @return {String}
 * @api public
 */

module.exports = function person(val, key, config, schema) {
  if (Array.isArray(val)) {
    if (val.length === 1) {
      val = val[0];
    } else {
      var arr = [];
      val.forEach(function(person) {
        if (typeof person === 'string') {
          person = utils.parseAuthor(person);
        }
        arr.push(utils.omitEmpty(person));
      });
      val = arr;
    }
  }

  if (typeof val === 'string') {
    val = utils.omitEmpty(utils.parseAuthor(val));
  }
  return val;
};
