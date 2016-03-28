'use strict';

var utils = require('../utils');

module.exports = function(val, key, config, schema) {
  if (utils.isObject(val)) {
    return val;
  }

  if (utils.isString(config.repository)) {
    config[key] = { url: utils.repo.issues(config) };
    return config[key];
  }
};
