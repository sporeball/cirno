import readline from 'readline';

import * as term from './terminal.js';
import emitter from './event.js';
import Normal from './modes/normal.js';

export function init () {
  global.cirno = {
    version: '0.0.0', // need to do it this way to avoid a warning
    mode: Normal
  };

  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  term.fullscreen(true);
  term.cursor(false);

  // start listening
  process.stdin.on('keypress', (str, data) => {
    emitter.emit('keypress', data);
  });
}

export function exit () {
  term.cursor(true);
  term.fullscreen(false);
  setTimeout(() => process.exit(), 100);
}
