'use strict';

var Expander = require('./');
var expander = new Expander();

// console.log(expander.expand(require('./package')))
console.log(expander.expand(require('./test/fixtures/authors-condensed')))
