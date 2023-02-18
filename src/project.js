import error, * as errors from './error.js';
import parse from './parser.js';
import tokenize from './tokenizer.js';
import { readFile } from './util.js';

/**
 * read a project from a file
 * @param {string} filename
 */
export function read (filename) {
  const code = readFile(filename);
  const tokens = tokenize(code);
  parse(tokens);
  if (errors.any()) {
    return error('could not open project');
  }
}
