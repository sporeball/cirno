import colors from 'picocolors';

import * as term from './terminal.js';

export default function error (message) {
  term.move(1, process.stdout.rows - 1);
  term.clearLine();
  process.stdout.write(colors.bgRed('E: ' + message));
}
