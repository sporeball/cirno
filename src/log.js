import colors from 'picocolors';

import modes from './modes.js';

function toString (value) {
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
  if (Array.isArray(value)) {
    return value.map(toString).join(', ');
  }
  if (typeof value === 'object') {
    return `${value.constructor.name} {\n` +
      Object.entries(value).map(entry => {
        return `  ${entry[0]}: ${toString(entry[1])}`;
      }).join(',\n') +
      `\n}`;
  }
}

export default function log (value) {
  global.cirno.log.push(toString(value));
  if (global.cirno.mode === modes.Console) {
    modes.Console.draw();
  }
}
