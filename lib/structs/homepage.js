const url = require('url');
const utils = require('../utils');

module.exports = schema => ({
  schema: 'string?',
  parse(value) {
    if (!value) return;
    let data = url.parse(value);
    if (!data) return data;
    let parts = data.pathname.split('/').filter(Boolean);
    data.username = parts[0];
    data.name = parts[1];
    return utils.omitEmpty(data);
  },
  format(data = {}) {
    let ctx = { ...data.bugs, ...data.homepage, ...data };
    return `https://${ctx.host}/${ctx.name}`;
  }
});
