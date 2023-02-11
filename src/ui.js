import colors from 'picocolors';

import * as term from './terminal.js';

export class Text {
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
