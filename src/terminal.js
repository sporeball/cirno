export function clear () {
  process.stdout.write('\x1b[2J');
}

export function cursor (show) {
  process.stdout.write('\x1b[?25');
  process.stdout.write(show ? 'h' : 'l');
}

export function fullscreen (enable) {
  process.stdout.write('\x1b[?1049');
  process.stdout.write(enable ? 'h' : 'l');
}

export function move (x, y) {
  // the escape sequence puts y first!
  process.stdout.write(`\x1b[${y};${x}H`);
}
