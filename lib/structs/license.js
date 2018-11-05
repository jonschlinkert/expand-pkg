const utils = require('../utils');
const spdx = require('../data/licenses-spdx');
const osi = require('../data/licenses-osi');

module.exports = schema => ({
  schema: 'string',
  default: 'MIT',
  validate(value) {
    if (value === 'MIT') return true;
    if (typeof value !== 'string') return false;
    if (value.toLowerCase() === 'unlicensed') return true;
    return validate(schema, value);
  }
});

function validate(schema, value) {
  if (value.toLowerCase().startsWith('see license in')) return true;
  if (value.toLowerCase().includes(' or ')) {
    let multiple = value.replace(/^\(|\)$/g, '').split(/ (?:or|OR) /);
    for (let val of multiple) {
      let isValid = validate(schema, val);
      if (isValid !== true) {
        return isValid;
      }
    }
    return true;
  }
  if (isValidLicense(value, osi.ids) === true) return true;
  if (schema.options.license === 'osi') return false;
  return isValidLicense(value, spdx);
}

function isValidLicense(value, licenses) {
  if (licenses.includes(value)) return true;
  for (let license of licenses) {
    let lowerl = license.toLowerCase();
    let lowerv = value.toLowerCase();
    let clean = v => v.split(/\s+/).join('');
    if (lowerl === value || lowerl === lowerv) {
      return true;
    }
    if (clean(lowerl) === clean(lowerv)) {
      return true;
    }
  }
  return new Error(`Invalid license: ${value}`);
}
