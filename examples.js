'use strict';

var ExpandPkg = require('./');
var pkg = new ExpandPkg();

// console.log(pkg.expand(require('./package')))
console.log(pkg.expand(require('./test/fixtures/authors-condensed')))
