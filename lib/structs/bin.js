const fs = require('fs');
const path = require('path');

module.exports = schema => ({
  schema: 'string? | object?',
  validate(value) {
    if (typeof value === 'string') {
      return validate(schema, value);
    }

    for (let key of Object.keys(value)) {
      let val = value[key];
      let isValid = validate(schema, value[key]);
      if (isValid !== true) {
        return isValid;
      }
    }
    return true;
  }
});

function validate(schema, value) {
  if (!fs.existsSync(path.join(schema.cwd, value))) {
    return new Error(`Invalid: bin path "${value}" does not exist`);
  }
  return true;
}
