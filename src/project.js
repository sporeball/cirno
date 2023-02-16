import fs from 'fs';
import path from 'path';

import error from './error.js';
import tokenize from './tokenizer.js';

let chips = [];

const parseRules = {
  // ...
}

/**
 * read a project from a file
 * @param {string} filename
 */
export function read (filename) {
  const code = fs.readFileSync(path.join(path.resolve(), filename), { encoding: 'utf-8' });
  const tokens = tokenize(code);
  // type check
  if (tokens[0].value !== 'type' || tokens[1].value !== 'project') {
    return error('could not open project');
  }
  tokens.shift();
  tokens.shift();
  // parse
  console.log(tokens);
  // TODO
}
