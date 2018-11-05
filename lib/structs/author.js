module.exports = schema => ({
  schema: 'string? | object?',
  parse(value) {
    if (!value) return;
    if (typeof value === 'string') {
      let parse = require('parse-author');
      value = parse(value);
    }
    if (value && value.url && /(github|twitter)\.com/.test(value.url)) {
      let segs = value.url.split('/');
      value.username = segs.pop();
      if (!schema.values.username) {
        schema.values.username = value.username;
      }
    }
    return value;
  },
  format(data) {
    let str = data.author.name;
    if (data.author.email) str += ` <${data.author.email}>`;
    if (data.author.url) str += ` (${data.author.url})`;
    return str;
  }
});
