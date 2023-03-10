/**
 * ex mode
 * used for executing commands
 */

import commands from '../commands.js';
import Mode from '../mode.js';
import modes from '../modes.js';
import * as term from '../terminal.js';

let c;
let command;

function init () {
  c = 1;
  command = [':'];
  term.move(2, process.stdout.rows - 1);
  term.clearLine();
}

// keypress override
export function keypress (data) {
  if (data.name === 'return') {
    // TODO: wire up to some actual commands
    if (command.join('') in commands) {
      commands[command.join('')]();
    }
    normalMode();
    return;
  }
  if (data.name === 'backspace') {
    term.move(c, process.stdout.rows - 1);
    process.stdout.write(' ');
    command.pop();
    if (c === 1) {
      normalMode();
      return;
    }
    term.move(c, process.stdout.rows - 1);
    c--;
    return;
  }
  if (data.sequence.length === 1) {
    // TODO: splice in
    process.stdout.write(data.sequence);
    c++;
    command.push(data.sequence);
  }
}

// switch to normal mode
function normalMode () {
  term.cursor(false);
  global.cirno.mode = modes.Normal;
}

const Ex = new Mode('ex')
  .addProperty({ name: 'init', value: init })
  .addProperty({ name: 'keypress', value: keypress });

export default Ex;
