import colors from 'picocolors';

import modes from './modes.js';
import { isObject, isSimpleArray, isSimpleObject } from './util.js';

function toString (value, indent = 0) {
  if (value === undefined) {
    return colors.gray('undefined');
  }
  if (typeof value === 'number') {
    return colors.yellow(value);
  }
  if (typeof value === 'string') {
    return colors.cyan("'" + value + "'");
  }
  if (typeof value === 'boolean') {
    return colors.yellow(value);
  }
  if (isSimpleArray(value)) {
    return '[ ' + value.map(toString).join(', ') + ' ]';
  }
  if (Array.isArray(value)) {
    return '[\n' +
      value.map(v => {
        return `${' '.repeat(indent + 2)}${toString(v, indent + 2)}`;
      }).join(',\n') +
      `\n${' '.repeat(indent)}]`;
  }
  if (isSimpleObject(value)) {
    const name = value.constructor.name;
    return `${name === 'Object' ? '' : `${name} `}{ ` +
      Object.entries(value).map(entry => {
        return `${entry[0]}: ${toString(entry[1])}`;
      }).join(', ') +
      ' }';
  }
  if (isObject(value)) {
    const name = value.constructor.name;
    return `${name === 'Object' ? '' : `${name} `}{\n` +
      Object.entries(value).map(entry => {
        return `${' '.repeat(indent + 2)}${entry[0]}: ${toString(entry[1], indent + 2)}`;
      }).join(',\n') +
      `\n${' '.repeat(indent)}}`;
  }
}

export default function log (value) {
  global.cirno.log.push(toString(value));
  if (global.cirno.mode === modes.Console) {
    modes.Console.draw();
  }
}
