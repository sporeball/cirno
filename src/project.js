import error, * as errors from './error.js';
import log from './log.js';
import parse, { shift } from './parser.js';
import tokenize from './tokenizer.js';
import { readFile2 } from './util.js';

let currentObject;

// rules for parsing projects
export const parsingRules = {
  ':': (tokens, object) => {
    shift(tokens);
    // TODO: make room for the next chip here
  },
  'chip': (tokens, object) => {
    shift(tokens);
    const chip = shift(tokens, 'keyword');
    // try to pull it from the standard library
    const code = readFile2('stdlib/' + chip + '.cic');
    // TODO: try to pull it from outside the standard library
    // TODO: rest of the parsing
    log(code);
  },
  'pos': (tokens, object) => {
    shift(tokens);
    const x = shift(tokens, 'number');
    const y = shift(tokens, 'number');
  }
};

/**
 * read a project from a file
 * @param {string} filename
 */
export function read (filename) {
  if (!filename.endsWith('.cip')) {
    return error(`invalid filetype: ${filename}`);
  }
  const code = readFile2(filename);
  const tokens = tokenize(code);
  const result = parse(tokens, parsingRules);
  if (errors.any()) {
    return error('could not open project');
  }
}
