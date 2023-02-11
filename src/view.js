import { Text } from './ui.js';

export default class View {
  constructor (name) {
    this.name = name;
    this.items = {};
  }

  addText (options) {
    this.items[options.name] = new Text(options);
    return this;
  }

  registerEvents (obj) {
    this.events = obj;
    return this;
  }

  render () {
    for (const item of Object.values(this.items)) {
      item.draw();
    }
    return this;
  }
}

export function renderView (view) {
  view.render();
}
