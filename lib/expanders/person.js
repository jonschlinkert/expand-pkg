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
  if (!config.parsedGitHubUrl) {
    schema.update('repository', config);
  }

  switch(utils.typeOf(val)) {
    case 'array':

      break;
    case 'object':

      break;
    case 'string':

      break;
    case 'undefined':
    default:
      return;
  }

  console.log(val);

  // console.log(val);
  // console.log('---------------');

  // var res = expandPerson(val || {}, key, config, schema.options);

  return val;
};

/**
 * Expand person strings into objects
 */

function expandPerson(val, key, config, options) {
  var opts = utils.merge({cwd: process.cwd()}, options);
  var cwd = opts.cwd;
  var person = {};

  if (utils.isString(val)) {
    person = utils.parseAuthor(val);
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

  if (utils.isObject(val)) {
    val.username = config.username || config.owner || utils.gitUserName();
    val.twitter = val.username;
    person = utils.merge(person, val);
  }

  // if (!person.username && person.url && /github\.com/.test(person.url)) {
  //   person.username = person.url.slice(person.url.lastIndexOf('/') + 1);
  // }
  // if (!person.username) {
  //   person.username = utils.gitUserName(cwd);
  // }
  // if (!person.twitter && person.username) {
  //   person.twitter = person.username;
  // }
  return utils.omitEmpty(person);
}
