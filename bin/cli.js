'use strict';

const parse = require('./parse');
const argv = parse(process.argv.slice(2));

console.log(argv);
