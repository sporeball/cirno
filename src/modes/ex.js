import Mode from '../mode.js';
import Normal from './normal.js';

export function keypress (data) {
  if (data.sequence.length === 1) {
    process.stdout.write(data.sequence);
  }
}

const Ex = new Mode('ex')
  .addProperty({ name: 'keypress', value: keypress });

export default Ex;
