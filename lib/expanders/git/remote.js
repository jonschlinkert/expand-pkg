'use strict';

var utils = require('../../utils');

module.exports = function(val, key, config, schema) {
  if (utils.isString(val)) {
    return val;
  }

  if (typeof val === 'undefind') {

  }
  return utils.remote.sync();
};
