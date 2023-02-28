import colors from 'picocolors';

import * as at from './at.js';
import error from './error.js';
import * as term from './terminal.js';

/**
 * class representing a line of text
 * TODO: dead?
 */
export class Text {
  /**
   * @param {object} options
   * @param {string} options.name
   * @param {number} options.x starting column
   * @param {number} options.y starting row
   * @param {string} options.value
   * @param {string} [options.color]
   * @param {boolean} [options.bold]
   */
  constructor (options) {
    this.name = options.name;
    this.x = options.x;
    this.y = options.y;
    this.value = options.value;
    this.color = options.color || 'white';
    this.bold = options.bold || false;
  }

  draw () {
    term.move(this.x, this.y);
    if (this.bold) {
      process.stdout.write(colors.bold(colors[this.color](this.value)));
    } else {
      process.stdout.write(colors[this.color](this.value));
    }
  }
}

export function drawChip (chip) {
  if (chip.x === undefined || chip.y === undefined) {
    return error('failed to draw chip: missing coordinate');
  }
  const { x, y } = chip;
  const [atX, atY] = at.position();
  for (const pin of Object.entries(chip.pins)) {
    const value = pin[1];
    if (value.x === undefined || value.y === undefined) {
      return error('failed to draw pin: missing coordinate');
    }
    // move
    const visualX = Math.floor(process.stdout.columns / 2) + x + value.x - atX;
    const visualY = Math.floor(process.stdout.rows / 2) + y + value.y - atY;
    term.move(visualX, visualY);
    process.stdout.write('.');
    // over check
    if (
      visualX === Math.floor(process.stdout.columns / 2) &&
      visualY === Math.floor(process.stdout.rows / 2)
    ) {
      reportPin(pin);
    }
  }
}

// TODO: so much repetition
export function drawNet (net) {
  if (net.y === undefined) {
    return error('failed to draw net: missing y coordinate');
  }
  const { y } = net;
  const [, atY] = at.position();
  const visualY = Math.floor(process.stdout.rows / 2) + y - atY;
  term.move(1, visualY);
  if (net.vcc === true) {
    process.stdout.write(colors.red('+'.repeat(process.stdout.columns)));
  }
  if (net.gnd === true) {
    process.stdout.write(colors.blue('-'.repeat(process.stdout.columns)));
  }
  // over check
  if (
    visualY === Math.floor(process.stdout.rows / 2)
  ) {
    reportNet(net);
  }
}

export function drawProject (project) {
  // TODO: for const object of entire project (will require type information)
  for (const chip of project.chips) {
    drawChip(chip);
  }
  for (const net of project.nets) {
    drawNet(net);
  }
}

function reportNet (net) {
  term.move(1, process.stdout.rows - 2);
  if (net.vcc === true) {
    return process.stdout.write(colors.red('vcc net'));
  }
  if (net.gnd === true) {
    return process.stdout.write(colors.blue('gnd net'));
  }
}

function reportPin (pin) {
  const [key, value] = pin;
  term.move(1, process.stdout.rows - 2);
  // TODO: logging here is a bug
  // log(pin);
  if (value.vcc === true) {
    return process.stdout.write(colors.red('vcc'));
  }
  if (value.gnd === true) {
    return process.stdout.write(colors.blue('gnd'));
  }
  if (value.label !== undefined) {
    return process.stdout.write(colors.cyan(value.label));
  }
  return process.stdout.write(`pin ${key}`);
}
