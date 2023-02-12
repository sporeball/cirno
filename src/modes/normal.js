import Mode from '../mode.js';
import * as term from '../terminal.js';
import Ex from './ex.js';

function sayHello () {
  console.log('hello cirno!');
}

function exMode () {
  term.move(1, process.stdout.rows - 1);
  process.stdout.write(':');
  global.cirno.mode = Ex;
}

const Normal = new Mode('normal')
  .addCommand({ sequence: 'H', fn: sayHello })
  .addCommand({ sequence: ':', fn: exMode });

export default Normal;
