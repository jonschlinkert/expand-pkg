module.exports = argv => {
  let res = { _: [] };
  let state = { i: 0, res };

  state.peek = () => argv[state.i + 1];
  state.next = () => argv[++state.i];

  for (; state.i < argv.length; state.i++) {
    let arg = argv[state.i];

    if (arg[0] !== '-') {
      res._.push(arg);
      continue;
    }

    if (arg.slice(0, 2) === '--') {
      let key = arg.slice(2);
      res[key] = toFlag(key, state.peek(), state);
      continue;
    }

    let chars = arg.slice(1).split('');
    let value;

    for (let char of chars) {
      if (value && typeof value !== 'boolean') {
        res[char] = value;
        continue;
      }
      res[char] = value = toFlag(char, state.peek(), state);
    }
  }
  return res;
};

function toFlag(key, value, state) {
  return value ? (value[0] !== '-' ? state.next() : true) : true;
}
