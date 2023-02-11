import readline from 'readline';

import * as term from './terminal.js';
import emitter from './event.js';

export function init () {
  global.cirno = {};
  global.cirno.version = '0.0.0';

  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  term.fullscreen(true);
  term.cursor(false);
}

export function listen () {
  process.stdin.on('keypress', (str, data) => {
    emitter.emit('keypress', data);
  });
}

export function exit () {
  term.cursor(true);
  term.fullscreen(false);
  setTimeout(() => process.exit(), 100);
}
