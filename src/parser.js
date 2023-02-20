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
 * @returns {object}
 */
export default function parse (tokens, rules, object) {
  if (tokens === undefined) {
    return;
  }
  // while there are still some tokens remaining...
  while (tokens.length > 0) {
    // find a rule, returning if there isn't one
    const rule = rules[tokens[0].value];
    if (rule === undefined) {
      return error(
        `parser: no matching rule found: ${tokens[0].value}`
      );
    }
    // execute the rule, returning if this throws an error
    rule(tokens, object);
    if (errors.any()) {
      return error('parser: failed to execute a rule');
    }
  }
  return object;
}
