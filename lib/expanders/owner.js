'use strict';

var utils = require('../utils');

module.exports = function(val, key, config, schema) {
  if (utils.isString(val)) {
    return val;
  }

  schema.update('name', config);
  schema.update('repository', config);

  var name = config.name;
  var owner = val;

  if (utils.isString(config.repository)) {
    var segs = config.repository.split('/');
    name = segs.pop();
    owner = segs[0];
  }

  owner = owner || config.username || utils.gitUserName();
  if (utils.isString(owner)) {
    if (!utils.isString(config.username)) {
      config.username = owner;
    }
    val = config[key] = owner;
    return val;
  }
};
