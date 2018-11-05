const fs = require('fs');
const path = require('path');

/**
 * The `main` property specifies the entry point for your package
 * when installed by downstream libraries.
 */

module.exports = schema => ({
  schema: 'string?',
  default: 'index.js',
  validate(value) {
    if (value && !fs.existsSync(path.join(schema.cwd, value))) {
      return false;
    }
    return true;
  },
  format(data) {
    if (!data.main || !fs.existsSync(path.join(schema.cwd, data.main))) {
      return void 0;
    }
    return data.main;
  }
});
