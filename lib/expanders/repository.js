'use strict';

var utils = require('../utils');

module.exports = function(val, key, config, schema) {
  if (typeof val === 'undefined' && config.name && config.owner) {
    return utils.repo.repository(config);
  }

  if (utils.isObject(val) && val.url) {
    val = val.url;
  }

  if (utils.isString(val)) {
    var parsed = utils.repo.parse(val);
    utils.merge(config, parsed);
    val = config[key] = parsed.repository;
    return val;
  }

  // if not returned already, val is invalid
  delete config[key];
  return;
};
