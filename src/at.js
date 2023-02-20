/**
 * the cursor is represented with @
 */

import * as project from './project.js';
import * as term from './terminal.js';

let x = 5;
let y = 5;

export function draw () {
  term.move(
    Math.floor(process.stdout.columns / 2),
    Math.floor(process.stdout.rows / 2)
  );
  process.stdout.write('@');
}

export function move (newX, newY) {
  x = newX;
  y = newY;
  project.draw();
}

export function moveBy (offsetX, offsetY) {
  move(x + offsetX, y + offsetY);
}

export function position () {
  return [x, y];
}
