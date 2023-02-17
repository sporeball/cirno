/**
 * the cursor is represented with @
 */

import * as term from './terminal.js';

let x = 0;
let y = 0;

export function move (newX, newY) {
  x = newX;
  y = newY;
}

export function moveBy (offsetX, offsetY) {
  move(x + offsetX, y + offsetY);
}

export function draw () {
  term.move(
    Math.floor(process.stdout.columns / 2),
    Math.floor(process.stdout.rows / 2)
  );
  process.stdout.write('@');
}
