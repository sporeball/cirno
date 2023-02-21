/**
 * console mode
 * displays cirno's debug log
 */

import colors from 'picocolors';

import Mode from '../mode.js';
import modes from '../modes.js';
import * as term from '../terminal.js';

function init () {
  term.clear();
  draw();
}

function draw () {
  term.move(1, 1);
  process.stdout.write(colors.yellow('debug log'));
  term.move(1, 3);
  // TODO: handle things better when logging more than a screen's worth
  for (const item of global.cirno.log) {
    process.stdout.write(item);
    term.nextLine();
  }
}

/**
 * switch back to normal mode
 * key: `C`
 */
function normalMode () {
  modes.Normal.init();
  global.cirno.mode = modes.Normal;
}

const Console = new Mode('console')
  .addProperty({ name: 'init', value: init })
  .addProperty({ name: 'draw', value: draw })
  .addCommand({ sequence: 'C', fn: normalMode });

export default Console;
