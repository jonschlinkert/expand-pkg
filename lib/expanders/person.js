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
    val = val[0];
  }

  if (typeof val === 'string') {
    val = config[key] = expandPerson(val, key, config, schema.options);
  }
  return val;
};

/**
 * Expand person strings into objects
 */

function expandPerson(val, key, config, options) {
  var opts = utils.merge({cwd: process.cwd()}, options);
  var cwd = opts.cwd;

  if (utils.isString(val)) {
    val = utils.parseAuthor(val);
  }

  if (Array.isArray(val)) {
    var len = val.length;
    var idx = -1;
    var obj = {};

    while (++idx < len) {
      var ele = expandPerson(val[idx], key, config, options);
      utils.merge(obj, ele);
    }
    config[key] = obj;
    return obj;
  }
  return utils.omitEmpty(val);
}
