import Mode from '../mode.js';
import Normal from './normal.js';

/**
 * keypress override
 */
export function keypress (data) {
  if (data.sequence.length === 1) {
    process.stdout.write(data.sequence);
  }
  // TODO: finish entry
  // TODO: normal mode return conditions
}

const Ex = new Mode('ex')
  .addProperty({ name: 'keypress', value: keypress });

export default Ex;
