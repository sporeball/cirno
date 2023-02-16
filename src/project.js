import fs from 'fs';
import path from 'path';

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
  console.log(tokens);
}
