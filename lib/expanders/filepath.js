'use strict';

var utils = require('../utils');

module.exports = function(val, key, config, schema) {
  return utils.repo.file(val);
};
