import colors from 'picocolors';

import * as term from './terminal.js';

let errors = [];

export default function error (message) {
  push(message);
  draw();

  term.move(1, process.stdout.rows - 1);
  term.clearLine();
  process.stdout.write(colors.bgRed('E: ' + message));
}

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

function push (message) {
  errors.push(message);
}
