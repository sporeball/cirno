/**
 * commands available to run in ex mode
 */

import * as cirno from './index.js';

const commands = {
  ':q': () => {
    // HACK
    return setTimeout(() => cirno.exit(), 50);
  }
}

export default commands;
