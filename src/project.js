import * as at from './at.js';
import * as chip from './chip.js';
import error, * as errors from './error.js';
import log from './log.js';
import parse, { shift } from './parser.js';
import * as term from './terminal.js';
import tokenize from './tokenizer.js';
import * as UI from './ui.js';
import { readFile2 } from './util.js';

let currentObject;

// rules for parsing projects
export const parsingRules = {
  ':': (tokens, object) => {
    shift(tokens);
    currentObject = {};
  },
  chip: (tokens, object) => {
    shift(tokens);
    const name = shift(tokens, 'keyword');
    // try to pull it from the standard library
    currentObject = chip.read('stdlib/' + name + '.cic');
    // TODO: try to pull it from outside the standard library
    object.chips.push(currentObject);
  },
  pos: (tokens, object) => {
    shift(tokens);
    currentObject.x = shift(tokens, 'number');
    currentObject.y = shift(tokens, 'number');
  }
};

export function draw () {
  term.clear();
  UI.drawProject(global.cirno.project);
  at.draw();
}

/**
 * read a project from a file
 * @param {string} filename
 * @returns {object}
 */
export function read (filename) {
  if (!filename.endsWith('.cip')) {
    return error(`invalid filetype: ${filename}`);
  }
  const object = {
    chips: []
  };
  const code = readFile2(filename);
  const tokens = tokenize(code);
  const result = parse(tokens, parsingRules, object);
  if (errors.any()) {
    return error('could not open project');
  }
  log(object);
  return result;
}
