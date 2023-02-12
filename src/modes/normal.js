import Mode from '../mode.js';

function sayHello () {
  console.log('hello cirno!');
}

const Normal = new Mode('normal')
  .addCommand({ sequence: 'H', fn: sayHello });

export default Normal;
