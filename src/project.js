import error, * as errors from './error.js';
import tokenize from './tokenizer.js';
import { readFile } from './util.js';

/**
 * object of parse rules
 * a rule will be executed if `tokens[0].value` matches the rule's key
 */
const parseRules = {
  'type': (tokens) => {
    shift(tokens);
    if (tokens[0]?.value !== 'project') {
      return error(`invalid type: ${tokens[0].value}`);
    }
    shift(tokens);
  },
  'atpos': (tokens) => {
    shift(tokens);
    const x = shift(tokens, 'number');
    const y = shift(tokens, 'number');
    // TODO: do the right thing
  },
  ':': (tokens) => {
    shift(tokens);
    // TODO: make room for the next chip here
  }
}

/**
 * remove one token, and return it
 * @param {object[]} tokens
 * @returns {object}
 */
function shift (tokens, type) {
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
  return tokens.shift();
}

/**
 * execute a parse rule, removing one or more tokens
 * @param {object[]} tokens
 */
function eat (tokens) {
  const rule = parseRules[tokens[0].value];
  if (rule === undefined) {
    return error(
      `parser: no matching rule found: ${tokens[0].value}`
    );
  }
  rule(tokens);
}

/**
 * read a project from a file
 * @param {string} filename
 */
export function read (filename) {
  const code = readFile(filename);
  const tokens = tokenize(code);
  if (errors.any()) {
    return error('could not open project');
  }
  // parse
  while (tokens.length > 0) {
    // execute a parse rule
    eat(tokens);
    // return if this threw an error
    if (errors.any()) {
      return error('could not open project');
    }
  }
}
