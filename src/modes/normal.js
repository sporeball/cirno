/**
 * normal mode
 * cirno is in this mode most of the time
 */

import * as at from '../at.js';
import * as cirno from '../index.js';
import Mode from '../mode.js';
import modes from '../modes.js';
import * as project from '../project.js';
import * as term from '../terminal.js';

function init () {
  term.clear();
  project.draw();
}

/**
 * switch to ex mode
 * key: `:`
 */
function exMode () {
  term.move(1, process.stdout.rows - 1);
  term.cursor(true);
  process.stdout.write(':');
  modes.Ex.init();
  global.cirno.mode = modes.Ex;
}

/**
 * switch to console mode
 * key: `C`
 */
function consoleMode () {
  modes.Console.init();
  global.cirno.mode = modes.Console;
}

const Normal = new Mode('normal')
  .addProperty({ name: 'init', value: init })
  .addCommand({ sequence: ':', fn: exMode })
  .addCommand({ sequence: 'C', fn: consoleMode })
  .addCommand({ sequence: 'h', fn: () => at.moveBy(-1, 0) })
  .addCommand({ sequence: 'j', fn: () => at.moveBy(0, 1) })
  .addCommand({ sequence: 'k', fn: () => at.moveBy(0, -1) })
  .addCommand({ sequence: 'l', fn: () => at.moveBy(1, 0) })

export default Normal;
