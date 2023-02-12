import e from 'events';
// import { pEvent } from 'p-event';

import * as cirno from './index.js';

// default export
const emitter = new e.EventEmitter();

async function keypressEvent (data) {
  // Ctrl+C to exit
  if (data.ctrl && data.name === 'c') {
    return cirno.exit();
  }
  // look for mode command
  if (Object.keys(global.cirno.mode.commands).includes(data.sequence)) {
    return global.cirno.mode.commands[data.sequence]();
  }
  console.log(data);
  // TODO
}

emitter.on('keypress', (data) => keypressEvent(data));

export {
  emitter as default
};
