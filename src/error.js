import colors from 'picocolors';

import * as term from './terminal.js';

let errors = [];

/**
 * throw an error
 * @param {string} message
 */
export default function error (message) {
  errors.push(message);
  draw();
}

/**
 * clear all errors
 */
export function clear () {
  for (let i = 0; i < errors.length; i++) {
    term.move(
      1,
      process.stdout.rows - 1 - (errors.length - 1 - i)
    );
    term.clearLine();
  }
  errors = [];
}

/**
 * draw all errors
 */
function draw () {
  // todo: repeated code??
  for (let i = 0; i < errors.length; i++) {
    term.move(
      1,
      process.stdout.rows - 1 - (errors.length - 1 - i)
    );
    term.clearLine();
    process.stdout.write(colors.bgRed('E: ' + errors[i]));
  }
}
