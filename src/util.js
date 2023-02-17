import fs from 'fs';
import path from 'path';

import error from './error.js';

export function readFile (filename) {
  try {
    return fs.readFileSync(path.join(path.resolve(), filename), { encoding: 'utf-8' });
  } catch (e) {
    return error(`file not found: ${filename}`);
  }
}
