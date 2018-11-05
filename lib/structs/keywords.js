module.exports = () => ({
  schema: 'array?',
  validate(v) {
    return Array.isArray(v) ? v.every(v => typeof v === 'string') : true;
  }
});
