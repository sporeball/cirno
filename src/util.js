import fs from 'fs';
import path from 'path';

import error from './error.js';

/**
 * get the contents of a file
 * @param {string} filename
 * @returns {string}
 */
export function readFile (filename) {
  try {
    return fs.readFileSync(path.join(path.resolve(), filename), { encoding: 'utf-8' });
  } catch (e) {
    return error(`file not found: ${filename}`);
  }
}
