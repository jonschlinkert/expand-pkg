'use strict';

var utils = require('../../utils');

module.exports = function(val, key, config, schema) {
  if (utils.isString(val)) {
    return val;
  }

  if (typeof val === 'undefind') {

  }

  val = utils.remote.sync();
  if (!utils.isString(val)) {
    console.log('no remote');
  }
  return val;
};

/**
 * Create a github repository url
 */

function updateRemote(config) {
  if (!utils.has(config, 'remote') && !utils.has(config, 'remote.url')) {
    var remote = 'https://github.com/' + config.repository;
    if (!/\.git$/.test(remote)) {
      remote += '.git';
    }
    utils.set(config, 'remote.url', remote);
  }
};

