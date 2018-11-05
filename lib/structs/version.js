module.exports = schema => {
  return {
    schema: 'string',
    default: '0.1.0',
    validate(value) {
      let semver = require('semver');
      return semver.valid(value);
    }
  };
};
