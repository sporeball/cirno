import error, * as errors from './error.js';

/**
 * remove one token, and return its value
 * @param {object[]} tokens
 * @param {string} [type]
 * @param {string} [value]
 * @returns {object}
 */
export function shift (tokens, type, value) {
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
 * parse a cirno file using a certain list of rules
 * @param {object[]} tokens
 * @param {object} rules
 */
export default function parse (tokens, rules) {
  if (tokens === undefined) {
    return;
  }
  while (tokens.length > 0) {
    // find a rule
    const rule = rules[tokens[0].value];
    // return if there isn't one
    if (rule === undefined) {
      return error(
        `parser: no matching rule found: ${tokens[0].value}`
      );
    }
    // execute the rule
    rule(tokens);
    // return if this threw an error
    if (errors.any()) {
      return error('parser: failed to execute a rule');
    }
  }
}
