/**
 * normal mode
 * cirno is in this mode most of the time
 */

import * as at from '../at.js';
import Mode from '../mode.js';
import modes from '../modes.js';
import * as term from '../terminal.js';

function init() {
}

// example function
function sayHello () {
  console.log('hello cirno!');
}

// switch to ex mode
function exMode () {
  term.move(1, process.stdout.rows - 1);
  term.cursor(true);
  process.stdout.write(':');
  modes.Ex.init();
  global.cirno.mode = modes.Ex;
}

const Normal = new Mode('normal')
  // .addCommand({ sequence: 'H', fn: sayHello })
  .addCommand({ sequence: ':', fn: exMode })
  .addCommand({ sequence: 'h', fn: () => at.moveBy(-1, 0) })
  .addCommand({ sequence: 'j', fn: () => at.moveBy(0, 1) })
  .addCommand({ sequence: 'k', fn: () => at.moveBy(0, -1) })
  .addCommand({ sequence: 'l', fn: () => at.moveBy(1, 0) })

export default Normal;
