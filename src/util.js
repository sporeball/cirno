import fs from 'fs';
import path from 'path';

import error from './error.js';

/**
 * return whether a value is an object
 * @param {any} value
 */
export function isObject (value) {
  return (
    typeof value === 'object' &&
    !Array.isArray(value) &&
    value !== null
  );
}

/**
 * return whether a value is an array with depth 0
 * @param {any} value
 */
export function isSimpleArray (value) {
  return (
    Array.isArray(value) &&
    value.every(v => !Array.isArray(v) && !isObject(v))
  );
}

/**
 * return whether a value is an object which does not have an object as one of
 * its keys
 * @param {any} value
 */
export function isSimpleObject (value) {
  return (
    isObject(value) &&
    Object.values(value).every(v => !Array.isArray(v) && !isObject(v))
  );
}

/**
 * get the contents of a file, returning undefined if the file is not found
 * @param {string} filename
 * @returns {string|undefined}
 */
export function readFile (filename) {
  try {
    return fs.readFileSync(path.join(path.resolve(), filename), { encoding: 'utf-8' });
  } catch (e) {
    return undefined;
  }
}

/**
 * get the contents of a file, returning an error if the file is not found
 * @param {string} filename
 * @returns {string}
 */
export function readFile2 (filename) {
  try {
    return fs.readFileSync(path.join(path.resolve(), filename), { encoding: 'utf-8' });
  } catch (e) {
    return error(`file not found: ${filename}`);
  }
}
