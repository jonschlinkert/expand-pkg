'use strict';

var utils = require('./lib/utils');

var expand = require('parse-authors');
var pkg = require('./test/fixtures/authors-condensed');

console.log(expand(pkg.authors.join('\n')))
