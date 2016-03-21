'use strict';

var fs = require('fs');
var path = require('path');
var url = require('url');

/**
 * Module depedencies
 */

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module depedencies
 */

// get/set/has
require('get-value', 'get');
require('has-value', 'has');
require('set-value', 'set');

// object/array utils
require('arr-union', 'union');
require('array-unique', 'unique');
require('define-property', 'define');
require('is-primitive');
require('kind-of', 'typeOf');
require('mixin-deep', 'merge');
require('omit-empty');

// parsers
require('git-user-name');
require('project-name', 'project');
require('parse-author');
require('parse-git-config');
require('parse-github-url', 'parseUrl');
require('remote-origin-url', 'remote');

// validators/resolvers
require('resolve');
require('semver');
require = fn;

/**
 * Camelcase the given string
 */

function camelcase(str) {
  if (str.length === 1) {
    return str.toLowerCase();
  }
  str = str.replace(/^[\W_]+|[\W_]+$/g, '').toLowerCase();
  return str.replace(/[\W_]+(\w|$)/g, function(_, ch) {
    return ch.toUpperCase();
  });
}

/**
 * Return true if `fp` exists on the file system
 */

utils.exists = function(fp) {
  try {
    fs.statSync(fp);
    return true;
  } catch (err) {};
  return false;
};

/**
 * Return true if `fp` exists on the file system
 */

utils.requirePackage = function(fp) {
  fp = path.resolve(fp);

  try {
    var stat = fs.statSync(fp);
    if (stat.isDirectory()) {
      fp = path.join(fp, 'package.json');
    } else if (!/package\.json$/.test(fp)) {
      fp = path.join(path.dirname(fp), 'package.json');
    }
    var pkg = require(fp);
    return pkg;
  } catch (err) {};
  return {};
};

/**
 * Return true if `val` is empty
 */

utils.isEmpty = function(val) {
  if (utils.isPrimitive(val)) {
    return val === 0 || val === null || typeof val === 'undefined';
  }
  if (Array.isArray(val)) {
    return val.length === 0;
  }
  if (utils.isObject(val)) {
    return Object.keys(utils.omitEmpty(val)).length === 0;
  }
};

/**
 * Return true if `val` is an object
 */

utils.isObject = function(val) {
  return utils.typeOf(val) === 'object';
};

/**
 * Return true if `val` is a string with a non-zero length
 */

utils.isString = function(val) {
  return val && typeof val === 'string';
};

/**
 * Cast `val` to an array
 */

utils.arrayify = function(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};


/**
 * Format the github url for a filepath in a repository
 *
 * @param {String} `repo`
 * @param {String} `filename`
 * @return {String}
 */

utils.repositoryFile = function(repo, filename, branch) {
  return 'https://github.com/' + repo + '/blob/' + (branch || 'master') + '/' + filename;
};

/**
 * Create a github repository string from `owner/name`
 */

utils.toRepository = function(config) {
  if (!utils.isString(config.owner)) {
    throw new TypeError('expected config.owner to be a string');
  }
  if (!utils.isString(config.name)) {
    throw new TypeError('expected config.name to be a string');
  }
  return config.owner + '/' + config.name;
};

/**
 * Create a github repository url
 */

utils.toGithubUrl = function(config) {
  if (!utils.isString(config.repository)) {
    throw new TypeError('expected config.repository to be a string');
  }
  var repo = 'https://github.com/' + config.repository;
  if (!config.homepage) {
    config.homepage = repo;
  }
  return repo;
};

/**
 * Return true if the given string looks like a github URL.
 *
 * @param {String} `str`
 * @return {Boolean}
 */

utils.isGithubUrl = function isGithubUrl(str) {
  var hosts = ['github.com', 'github.io', 'gist.github.com'];
  return hosts.indexOf(url.parse(str).host) > -1;
};

/**
 * Return true if the given string looks like a github URL.
 *
 * @param {String} `str`
 * @return {Boolean}
 */

utils.parseGithubUrl = function(str, config) {
  if (config.parsedGitHubUrl === true) return config;
  var parsed = utils.omitEmpty(utils.parseUrl(str));
  utils.define(config, 'parsedGitHubUrl', true);

  for (var key in parsed) {
    if (parsed.hasOwnProperty(key)) {
      config[key] = parsed[key];
    }
  }
  return config;
};

/**
 * Get the homepage for a repo
 *
 * @param {Object} config
 * @return {String|Null}
 */

utils.homepage = function homepage(repository, config) {
  if (utils.isGithubUrl(repository)) {
    if (typeof config === 'undefined') {
      throw new Error('expected a repository string in the form of "owner/repo"');
    }
    utils.parseGithubUrl(repository, config);
    repository = config.repository;
  }
  return 'https://github.com/' + utils.stripSlash(repository);
};

/**
 * Strip a trailing slash from a string.
 *
 * @param {String} `str`
 * @return {String}
 */

utils.stripSlash = function stripSlash(str) {
  return str.replace(/\/$/, '');
};

/**
 * Expose `utils`
 */

module.exports = utils;
