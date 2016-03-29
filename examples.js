'use strict';

var Config = require('./');
var config = new Config();

// console.log(config.expand(require('./package')))
console.log(config.expand(require('./test/fixtures/authors-condensed')))
