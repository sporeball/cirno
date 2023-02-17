import error from './error.js';

const tokenTypes = {
  identifier: /^'.+/g,
  keyword: /^[a-z][a-z0-9]*/g,
  number: /^0$|^[1-9][0-9]*/g,
  ender: /^\.$/,
  separator: /^:$/g
}

export default function tokenize (code) {
  if (code === undefined) {
    return;
  }
  const stream = code
    .split('\n')
    .filter(line => line.length !== 0)
    .flatMap(line => line.split(' '));
  const tokens = [];
  for (const word of stream) {
    const match = Object.entries(tokenTypes)
      .find(entry => word.match(entry[1]));
    if (match === undefined) {
      return error(`no matching token type found: ${word}`);
    }
    tokens.push({
      type: match[0],
      value: word.match(match[1])[0]
    });
  }
  return tokens;
}
