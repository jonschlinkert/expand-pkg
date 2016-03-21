'use strict';

var utils = require('../utils');

module.exports = function(val, key, config, schema) {
  if (typeof val === 'undefined') {
    schema.update('git', config);
    val = utils.get(config, 'git.remote.url');
  }

  if (utils.isObject(val) && val.url) {
    val = val.url;
  }

  if (utils.isString(val)) {
    utils.parseGithubUrl(val, config);
    return config.repo;
  }

  // if not returned already, val is invalid
  delete config[key];
  return;
};
