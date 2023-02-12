export default class Mode {
  constructor (name) {
    this.name = name;
    this.commands = {};
  }

  addCommand (options) {
    this.commands[options.sequence] = options.fn;
    return this;
  }
}
