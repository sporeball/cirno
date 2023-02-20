import readline from 'readline';

import * as at from './at.js';
import * as term from './terminal.js';
import emitter from './event.js';
import Normal from './modes/normal.js';

/**
 * initialize cirno
 */
export function init () {
  global.cirno = {
    version: '0.0.0', // need to do it this way to avoid a warning
    mode: Normal,
    log: []
  };

  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  term.fullscreen(true); // alternate screen buffer
  term.cursor(false); // hide the cursor

  // start listening
  process.stdin.on('keypress', (str, data) => {
    emitter.emit('keypress', data);
  });

  at.draw();
}

/**
 * exit cirno
 */
export function exit () {
  term.cursor(true);
  term.fullscreen(false);
  // can't do it instantly
  setTimeout(() => process.exit(), 100);
}
