'use strict';

var remote = require('./git/remote');
var utils = require('../utils');
var parsed;

module.exports = function(val, key, config, schema) {
  if (!utils.isObject(val)) {
    var git = utils.parseGitConfig.sync(val);
    var obj = utils.parseGitConfig.keys(git);

    if (utils.get(obj, 'remote.origin')) {
      val = { remote: obj.remote.origin }
    }
  }
  return val;
};
