/**
 * all the mode instances which cirno knows about
 * for the class itself, see mode.js
 */

import Ex from './modes/ex.js';
import Normal from './modes/normal.js';

/**
 * default export is a single object containing every imported mode
 * other files should import this as `modes`
 */
export default {
  Ex,
  Normal
};
