'use strict';

var utils = require('../utils');
var parsed;

module.exports = function(val, key, config, schema) {
  if (!utils.isObject(val)) {
    var git = utils.parseGitConfig.sync(val);
    var obj = utils.parseGitConfig.keys(git);

    var remote = utils.get(obj, 'remote.origin');
    if (remote) {
      config.remote = remote;
      val = config[key] = { remote: remote };
    }
  }
  return val;
};
