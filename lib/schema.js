'use strict';

var Schema = require('map-schema');
var expanders = require('./expanders');
var validators = require('./validators');
var utils = require('./utils');
var keys = require('./keys');

/**
 * Expand package.json using a schema.
 */

function expand(options) {
  var opts = utils.merge({}, options);
  opts.keys = utils.union([], keys, opts.keys);
  opts.omit = utils.arrayify(opts.omit);

  var schema = new Schema(opts)
    .field('name', ['string'], {
      validate: validators.name,
      normalize: expanders.name,
      required: true
    })
    .field('private', 'boolean')
    .field('description', 'string')
    .field('version', 'string', {
      validate: validators.version,
      default: '0.1.0',
      required: true
    })
    .field('homepage', 'string', {
      normalize: expanders.homepage
    })

    /**
     * Person fields
     */

    .field('author', ['object', 'string'], { normalize: expanders.person })
    .field('username', 'string', { normalize: expanders.username })
    .field('owner', 'string', { normalize: expanders.owner })
    .field('authors', 'array', { normalize: expanders.person })
    .field('maintainers', 'array', { normalize: expanders.person })
    .field('contributors', 'array', { normalize: expanders.person })
    .field('collaborators', 'array', { normalize: expanders.person })

    /**
     * Bugs, repo and license
     */

    .field('git', ['object', 'string'], {
      normalize: expanders.git
    })
    .field('github', ['object', 'string'], {
      normalize: expanders.github
    })
    .field('bugs', ['object', 'string'], {
      normalize: expanders.bugs
    })
    .field('repository', ['object', 'string'], {
      normalize: expanders.repository
    })
    .field('license', ['object', 'string'], {
      normalize: expanders.license,
      default: 'MIT'
    })
    .field('licenses', ['array', 'object'], {
      normalize: expanders.licenses,
      validate: validators.licenses
    })

    /**
     * Files, main
     */

    .field('files', 'array', {
      normalize: expanders.files
    })
    .field('main', 'string', {
      normalize: expanders.main,
      validate: function(filepath) {
        return utils.exists(filepath);
      }
    })

    /**
     * Engine
     */

    .field('engines', 'object', {
      default: {node: '>= 0.10.0'}
    })
    .field('engine-strict', 'boolean', {
      validate: validators['engine-strict']
    })
    .field('engineStrict', 'boolean', {
      normalize: expanders.engineStrict
    })

    /**
     * Scripts, binaries and related
     */

    .field('bin', ['object', 'string'], { validate: validators.bin })
    .field('preferGlobal', 'boolean', { validate: validators.preferGlobal })
    .field('scripts', 'object', { normalize: expanders.scripts })

    /**
     * Dependencies
     */

    .field('dependencies', 'object')
    .field('devDependencies', 'object')
    .field('peerDependencies', 'object')
    .field('optionalDependencies', 'object')

    /**
     * Project metadata
     */

    .field('keywords', 'array', { normalize: expanders.keywords })
    .field('man', ['array', 'string']);

  // Add fields defined on `options.fields`
  schema.addFields(opts);
  return schema;
};

/**
 * Expose `expand.create`
 */

module.exports = expand;
