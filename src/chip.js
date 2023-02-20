import error, * as errors from './error.js';
import log from './log.js';
import parse, { shift } from './parser.js';
import tokenize from './tokenizer.js';
import { readFile2 } from './util.js';

let currentObject;

// rules for parsing chips
export const parsingRules = {
  ':': (tokens, object) => {
    shift(tokens);
    currentObject = {};
  },
  '.': (tokens, object) => {
    shift(tokens);
  },
  gnd: (tokens, object) => {
    shift(tokens);
    currentObject.gnd = true;
  },
  label: (tokens, object) => {
    shift(tokens);
    currentObject.label = shift(tokens, 'identifier');
  },
  pin: (tokens, object) => {
    shift(tokens);
    const n = shift(tokens, 'number');
    object.pins[Number(n)] = currentObject;
  },
  pos: (tokens, object) => {
    shift(tokens);
    const x = shift(tokens, 'number');
    const y = shift(tokens, 'number');
    currentObject.x = Number(x);
    currentObject.y = Number(y);
  },
  value: (tokens, object) => {
    // TODO
    while (tokens.length > 0 && tokens[0].type !== 'ender') {
      shift(tokens);
    }
  },
  vcc: (tokens, object) => {
    shift(tokens);
    currentObject.vcc = true;
  }
};

/**
 * read a chip from a file
 * @param {string} filename
 * @returns {object}
 */
export function read (filename) {
  if (!filename.endsWith('.cic')) {
    return error(`invalid filetype: ${filename}`);
  }
  const object = {
    pins: {}
  };
  const code = readFile2(filename);
  const tokens = tokenize(code);
  const result = parse(tokens, parsingRules, object);
  if (errors.any()) {
    return error('could not parse chip');
  }
  return result;
}
