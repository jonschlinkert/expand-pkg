'use strict';

var utils = require('../utils');

module.exports = function(val, key, config, schema) {
  if (utils.isString(val)) return val;

  schema.update('repository', config);
  if (utils.isString(config.repository)) {
    return utils.homepage(config.repository, config);
  }

  schema.update('owner', config);

  if (!utils.isString(config.repository) && config.owner) {
    config.repository = utils.toRepository(config);
  }

  if (utils.isString(config.repository)) {
    return utils.homepage(config.repository, config);
  }
};
