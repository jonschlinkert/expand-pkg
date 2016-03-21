'use strict';

var utils = require('../utils');

module.exports = function(val, key, config, schema) {
  if (utils.isString(val)) {
    val = { url: val };
  }

  if (typeof val === 'undefind') {
    schema.udpdate('git', config);
  }

  var remote = utils.get(config, 'git.remote.url');
  if (utils.isString(remote)) {
    val = { url: remote };
  }
  return val;
};
