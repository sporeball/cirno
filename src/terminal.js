/**
 * clear the screen
 */
export function clear () {
  process.stdout.write('\x1b[2J');
}

/**
 * show or hide the cursor
 * @param {boolean} show
 */
export function cursor (show) {
  process.stdout.write('\x1b[?25');
  process.stdout.write(show ? 'h' : 'l');
}

/**
 * enable or disable the alternate screen buffer
 * @param {boolean} enable
 */
export function fullscreen (enable) {
  process.stdout.write('\x1b[?1049');
  process.stdout.write(enable ? 'h' : 'l');
}

/**
 * change the current cursor position
 * @param {number} x
 * @param {number} y
 */
export function move (x, y) {
  // the escape sequence puts y first!
  process.stdout.write(`\x1b[${y};${x}H`);
}
