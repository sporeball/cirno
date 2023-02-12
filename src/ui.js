import colors from 'picocolors';

import * as term from './terminal.js';

/**
 * class representing a line of text
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
