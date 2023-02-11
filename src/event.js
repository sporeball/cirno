import e from 'events';
import { pEvent } from 'p-event';

import * as cirno from './index.js';

// default export
const emitter = new e.EventEmitter();

async function keypressEvent (data) {
  console.log(data);
  // Ctrl+C to exit
  if (data.ctrl && data.name === 'c') {
    cirno.exit();
    return;
  }
  // TODO
}

emitter.on('keypress', (data) => keypressEvent(data));

export {
  emitter as default,
};
