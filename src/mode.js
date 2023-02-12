/**
 * class representing a mode (e.g. normal or ex)
 */
export default class Mode {
  /**
   * @param {string} name
   */
  constructor (name) {
    this.name = name;
    this.commands = {};
  }

  /**
   * create a command to be made available in this mode
   * @param {object} options
   * @param {string} options.sequence
   * @param {function} options.fn
   */
  addCommand (options) {
    this.commands[options.sequence] = options.fn;
    return this;
  }

  /**
   * add a property to be made available on this mode
   * @see modes/ex.js::keypress - example use case
   * @param {object} options
   * @param {string} options.name
   * @param {any} options.value
   */
  addProperty (options) {
    this[options.name] = options.value;
    return this;
  }
}
