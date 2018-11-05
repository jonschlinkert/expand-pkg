const fs = require('fs');
const path = require('path');

/**
 * Files to include when publishing your package. You may specify one or
 * more file paths, directory paths, or glob patterns for the paths to match.
 */

module.exports = schema => ({
  schema: 'array?',
  format(data) {
    if (!data.files) return [];

    let arr = data.files.slice();
    if (data.main && !arr.includes(data.main)) {
      arr.push(data.main);
    }

    let files = [];
    for (let file of arr) {
      let filepath = path.join(schema.cwd, file.toLowerCase());
      let val = path.relative(schema.cwd, filepath); //<= normalize

      if (!files.includes(val) && fs.existsSync(filepath)) {
        files.push(val);
      }
    }
    return files.sort();
  },
  validate(v) {
    return Array.isArray(v) ? v.every(v => typeof v === 'string') : true;
  }
});
