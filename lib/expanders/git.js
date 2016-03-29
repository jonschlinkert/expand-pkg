'use strict';

var utils = require('../utils');

module.exports = function(val, key, config, schema) {
  if (utils.isString(config.repository)) {
    utils.merge(config, utils.repo.expand(config.homepage, config));
  }

  if (!utils.isObject(val)) {
    var git = utils.parseGitConfig.sync(val);
    var obj = utils.parseGitConfig.keys(git);

    var remote = utils.get(obj, 'remote.origin');
    if (remote) {
      val = config[key] = { remote: remote };
    }
  }
  return val;
};
