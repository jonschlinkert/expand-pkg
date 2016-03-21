'use strict';

// require('time-require');
var Base = require('base');
var data = require('base-data');
var schema = require('./lib/schema');
var utils = require('./lib/utils');

function Expander(options) {
  Base.call(this);
  this.use(data());
  this.options = options || {};
  this.schema = schema(this.options);
  this.schema.on('warning', this.emit.bind(this, 'warning'));
  this.schema.on('error', this.emit.bind(this, 'error'));
}

Base.extend(Expander);

Expander.prototype.field = function(options) {
  this.schema.field(...arguments);
  return this;
};

Expander.prototype.expand = function(config, options) {
  if (typeof config === 'string') {
    config = utils.requirePackage(config);
  }
  return this.schema.normalize(config, options);
};

/**
 * Expander
 */

module.exports = Expander;
