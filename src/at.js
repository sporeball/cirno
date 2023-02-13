/**
 * the cursor is represented with @
 */

import * as term from './terminal.js';

let x = Math.floor(process.stdout.columns / 2);
let y = Math.floor(process.stdout.rows / 2);

export function move (newX, newY) {
  // erase at the old position
  term.move(x, y);
  process.stdout.write(' ');
  // draw at the new position
  x = newX;
  y = newY;
  draw();
}

export function moveBy (offsetX, offsetY) {
  move(x + offsetX, y + offsetY);
}

export function draw () {
  term.move(x, y);
  process.stdout.write('@');
}
