/**
 * normal mode
 * cirno is in this mode most of the time
 */

import Mode from '../mode.js';
import modes from '../modes.js';
import * as term from '../terminal.js';

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
  .addCommand({ sequence: 'H', fn: sayHello })
  .addCommand({ sequence: ':', fn: exMode });

export default Normal;
