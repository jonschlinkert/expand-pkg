'use strict';

var utils = require('../utils');

module.exports = function(val, key, config, schema) {
  if (utils.isString(val)) {
    val = { url: val };
  }

  if (typeof val === 'undefined') {
    schema.update('git', config);
  }

  if (config.remote) {
    val = { url: config.remote };
  }
  return val;
};
