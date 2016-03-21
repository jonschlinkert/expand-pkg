'use strict';

var utils = require('../utils');

module.exports = function(val, key, config, schema) {
  if (utils.isString(val)) {
    return val;
  }

  if (!config.parsedGitHubUrl) {
    schema.update('repository', config);
  }

  // var owner = config.owner || config.username || utils.gitUserName();
  // if (utils.isString(owner)) {
  //   if (!utils.isString(config.username)) {
  //     config.username = owner;
  //   }
  //   config[key] = owner;
  //   return owner;
  // }
};
