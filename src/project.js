import error from './error.js';
import tokenize from './tokenizer.js';
import { readFile } from './util.js';

const parseRules = {
  // ...
}

/**
 * read a project from a file
 * @param {string} filename
 */
export function read (filename) {
  const code = readFile(filename);
  const tokens = tokenize(code);
  // type check
  if (tokens?.[0].value !== 'type' || tokens?.[1].value !== 'project') {
    return error('could not open project');
  }
  tokens.shift();
  tokens.shift();
  // parse
  console.log(tokens);
  // TODO
}
