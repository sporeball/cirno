import error, * as errors from './error.js';
import parse, { shift } from './parser.js';
import tokenize from './tokenizer.js';
import { readFile } from './util.js';

// rules for parsing projects
export const parsingRules = {
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
};

/**
 * read a project from a file
 * @param {string} filename
 */
export function read (filename) {
  const code = readFile(filename);
  const tokens = tokenize(code);
  parse(tokens, parsingRules);
  if (errors.any()) {
    return error('could not open project');
  }
}
