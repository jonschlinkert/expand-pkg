/**
 * Must be <=214 characters, including the "@scope/" prefix.
 * Must be all lowercase, no uppercase characters.
 * Must not start with ".", "_" or "-".
 * Must be one word, no spaces.
 * Must use only URL-safe characters.
 * Hyphens and underscores allowed.
 */

module.exports = schema => ({
  schema: 'string',
  validate(value) {
    if (value.length > 214) {
      return new Error(`Invalid: "name" must be fewer than 214 characters.`);
    }

    if (/\s/.test(value)) {
      return new Error(`Invalid: "name" must not contain whitespace characters.`);
    }

    if (value[0] === '-' || value[0] === '.' || value[0] === '_') {
      return new Error(`Invalid: "name" must not start with: ${value[0]}`);
    }

    if (/[A-Z]/.test(value)) {
      return new Error(`Invalid: "name" must consist of all lowercase characters.`);
    }

    return true;
  },
  parse(value) {
    let segs = value.split('/');
    if (segs.length > 1) {
      schema.values.scope = segs[0].slice(1);
      value = segs[1];
    }
    return value;
  },
  format(data) {
    if (data.scope) {
      return `@${data.scope.replace(/^@/, '')}/${data.name}`;
    }
    return data.name;
  },
});
