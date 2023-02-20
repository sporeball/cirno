import colors from 'picocolors';

import * as at from './at.js';
import * as term from './terminal.js';

/**
 * class representing a line of text
 * TODO: dead?
 */
export class Text {
  /**
   * @param {object} options
   * @param {string} options.name
   * @param {number} options.x starting column
   * @param {number} options.y starting row
   * @param {string} options.value
   * @param {string} [options.color]
   * @param {boolean} [options.bold]
   */
  constructor (options) {
    this.name = options.name;
    this.x = options.x;
    this.y = options.y;
    this.value = options.value;
    this.color = options.color || 'white';
    this.bold = options.bold || false;
  }

  draw () {
    term.move(this.x, this.y);
    if (this.bold) {
      process.stdout.write(colors.bold(colors[this.color](this.value)));
    } else {
      process.stdout.write(colors[this.color](this.value));
    }
  }
}

export function drawChip (chip) {
  if (chip.x === undefined || chip.y === undefined) {
    return error('failed to draw chip: missing coordinate');
  }
  const { x, y } = chip;
  const [atX, atY] = at.position();
  for (const pin of Object.entries(chip.pins)) {
    const [key, value] = pin;
    if (value.x === undefined || value.y === undefined) {
      return error('failed to draw pin: missing coordinate');
    }
    // move
    // @ 5, 5
    // chip 10, 10
    term.move(
      Math.floor(process.stdout.columns / 2) + x + value.x - atX,
      Math.floor(process.stdout.rows / 2) + y + value.y - atY
    );
    process.stdout.write('.');
  }
}

export function drawProject (project) {
  for (const chip of project.chips) {
    drawChip(chip);
  }
}
