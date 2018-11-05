const url = require('url');
const utils = require('../utils');

module.exports = schema => {
  return {
    schema: 'string | object',
    parse(value) {
      if (typeof value !== 'string') value = value.url;
      let data = url.parse(value);
      if (!data) return data;
      let parts = data.pathname.split('/').filter(Boolean);
      data.username = parts[0];
      data.name = parts[1];
      return utils.omitEmpty(data);
    },
    format(data = {}) {
      let ctx = { ...data.bugs, ...data.homepage, ...data };
      return `${ctx.host}/${ctx.name}`;
    }
  };
};
