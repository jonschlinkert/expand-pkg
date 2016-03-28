'use strict';

var expanders = require('./expanders');
var Pkg = require('normalize-pkg');

/**
 * Expand package.json using a schema.
 */

module.exports = function(options) {
  var pkg = new Pkg(options);
  var schema = pkg.schema

    /**
     * Person fields
     */

    .field('owner', 'string', { normalize: expanders.owner })
    .field('author', ['object', 'string'], { normalize: expanders.person })
    .field('authors', ['array', 'object'], { normalize: expanders.person })
    .field('maintainers', 'array', { normalize: expanders.person })
    .field('contributors', 'array', { normalize: expanders.person })
    .field('collaborators', 'array', { normalize: expanders.person })

    /**
     * Bugs, repo and license
     */

    .field('git', ['object', 'string'], {
      normalize: expanders.git
    });

  // Add fields defined on `options.fields`
  schema.addFields(options);
  return schema;
};
