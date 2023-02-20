import e from 'events';
// import { pEvent } from 'p-event';

import * as error from './error.js';
import * as cirno from './index.js';
import log from './log.js';
import modes from './modes.js';

// default export
const emitter = new e.EventEmitter();

/**
 * `keypress` event callback function
 * this event is emitted every time a key is pressed,
 * but some unrelated operations will emit it too
 * @param {object} data
 */
async function keypressEvent (data) {
  // Ctrl+C to exit
  if (data.ctrl && data.name === 'c') {
    return cirno.exit();
  }

  error.clear();

  // look for a command provided by the current mode
  if (Object.keys(global.cirno.mode.commands || {}).includes(data.sequence)) {
    return global.cirno.mode.commands[data.sequence]();
  // ex mode likes to do its own thing
  } else if (global.cirno.mode === modes.Ex) {
    return modes.Ex.keypress(data);
  } else {
    // debug
    log(data);
  }
  // TODO
}

emitter.on('keypress', (data) => keypressEvent(data));

export {
  emitter as default
};
