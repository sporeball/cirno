import error, * as errors from './error.js';

/**
 * object of parsing rules
 * a rule will be executed if `tokens[0].value` matches the rule's key
 */
const rules = {
  ':': (tokens) => {
    shift(tokens);
    // TODO: make room for the next chip here
  },
  'atpos': (tokens) => {
    shift(tokens);
    const x = shift(tokens, 'number');
    const y = shift(tokens, 'number');
    // TODO: do the right thing
  },
  'type': (tokens) => {
    shift(tokens);
    const type = shift(tokens, 'keyword');
    // TODO: verify
  }
}

/**
 * remove one token, and return its value
 * @param {object[]} tokens
 * @param {string} [type]
 * @param {string} [value]
 * @returns {object}
 */
function shift (tokens, type, value) {
  if (tokens.length === 0) {
    return error(
      `expected token of type ${type}, found EOF`
    );
  }
  if (type !== undefined && tokens[0].type !== type) {
    return error(
      `expected token of type ${type}, got ${tokens[0].type}`
    );
  }
  if (value !== undefined && tokens[0].value !== value) {
    return error(
      `expected token with value ${value}, got ${tokens[0].value}`
    );
  }
  return tokens.shift().value;
}

/**
 * execute a parsing rule, removing one or more tokens
 * @param {object[]} tokens
 */
function eat (tokens) {
  const rule = rules[tokens[0].value];
  if (rule === undefined) {
    return error(
      `parser: no matching rule found: ${tokens[0].value}`
    );
  }
  rule(tokens);
}

export default function parse (tokens) {
  if (tokens === undefined) {
    return;
  }
  while (tokens.length > 0) {
    // execute a parse rule
    eat(tokens);
    // return if this threw an error
    if (errors.any()) {
      return error('parser: failed to execute a rule');
    }
  }
}
