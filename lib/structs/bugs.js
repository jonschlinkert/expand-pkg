const url = require('url');
const utils = require('../utils');

module.exports = () => ({
  schema: 'string? | object?',
  parse(value) {
    if (!value) return;
    if (typeof value !== 'string') value = value.url;
    let data = url.parse(value);
    if (!data) return data;
    let parts = data.pathname.split('/').filter(Boolean);
    data.username = parts[0];
    data.name = parts[1];
    return utils.omitEmpty(data);
  },
  format(data = {}) {
    let ctx = { ...data.homepage, ...data.bugs, ...data };
    return { url: `https://${ctx.host}/${ctx.name}/issues` };
  }
});
