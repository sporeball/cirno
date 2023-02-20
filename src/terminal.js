/**
 * clear the screen
 */
export function clear () {
  process.stdout.write('\x1b[2J');
}

/**
 * clear from the cursor to the end of the line
 */
export function clearLine () {
  process.stdout.write('\x1b[0K');
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

/**
 * move the cursor to the beginning of the next line
 */
export function nextLine () {
  process.stdout.write('\x1b[1E');
}
