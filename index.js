'use strict';

console.time('total');
process.on('exit', () => console.timeEnd('total'));

const url = require('url');
const isUrl = require('is-url');
const MapSchema = require('map-schema');
const structs = require('./lib/structs');
const keys = require('./lib/data/keys');

class ExpandPackage extends MapSchema {
  constructor(options, values = {}) {
    super({ strict: true, ...options, values });
    this.cwd = this.options.cwd || process.cwd();
  }

  expand(pkg, options) {
    for (let name of Object.keys(structs)) {
      if (!this.fields.has(name)) {
        this.field(name, structs[name](this));
      }
    }
    return this.parse(pkg);
  }

  format(...args) {
    let names = this.options.keys || keys;
    let res = super.format(...args);
    let pkg = {};
    for (let name of names) {
      if (res.hasOwnProperty(name) && res[name] !== void 0) {
        pkg[name] = res[name];
      }
    }
    return pkg;
  }
}

let expander = new ExpandPackage({ validateKeys: true });
let result = expander.expand({
  name: '@foo/map-schema',
  description: 'Normalize an object by running normalizers and validators that are mapped to a schema.',
  version: '0.2.4',
  foo: 'bar',
  one: 'bar',
  homepage: 'https://github.com/jonschlinkert/map-schema',
  // author: 'Jon Schlinkert (https://github.com/jonschlinkert)',
  author: {
    name: 'Jon Schlinkert',
    url: 'https://github.com/jonschlinkert'
  },
  contributors: [
    'Brian Woodward (https://twitter.com/doowb)',
    'Jon Schlinkert <jon.schlinkert@sellside.com> (http://twitter.com/jonschlinkert)'
  ],
  repository: 'jonschlinkert/map-schema',
  // repository: { type: 'git', url: 'jonschlinkert/map-schema' },
  private: false,
  preferGlobal: false,
  bugs: {
    url: 'https://github.com/jonschlinkert/map-schema/issues'
  },
  license: 'MIT',
  files: ['lib', 'bin', '/bin', './bin', 'templates'],
  main: 'index.js',
  engines: {
    node: '>=0.10.0'
  },
  // bin: 'bin/cli.js',
  bin: {
    foo: 'bin/cli.js'
  },
  scripts: {
    test: 'mocha',
    cover: 'nyc --reporter=text --reporter=html mocha'
  },
  dependencies: {
    'mixin-deep': '^2.0.0',
    superstruct: '^0.6.0'
  },
  devDependencies: {
    isobject: '^3.0.0',
    mocha: '^3.2.0'
  },
  keywords: ['map', 'schema']
});

console.log(result.values)
console.log(result.state);
// console.log(result.fields.get('name').format({ scope: 'assemble', name: 'assemble' }));
// console.log(result.format(result.values));
// console.log(values.author.format());
// console.log(values.homepage.format());

// let semver = require('semver');
// let Struct = struct(value => !!semver.valid(value));
// console.log(Struct('foo'));
