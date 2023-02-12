import { Text } from './ui.js';

/**
 * class representing a view
 */
export default class View {
  /**
   * @param {string} name
   */
  constructor (name) {
    this.name = name;
    this.items = {};
  }

  /**
   * add text to this view
   * @see ui.js::Text - valid options
   * @param {object} options
   */
  addText (options) {
    this.items[options.name] = new Text(options);
    return this;
  }

  registerEvents (obj) {
    this.events = obj;
    return this;
  }

  /**
   * render this view
   */
  render () {
    for (const item of Object.values(this.items)) {
      item.draw();
    }
    return this;
  }
}

/**
 * render a view
 * @param {View} view
 */
export function renderView (view) {
  view.render();
}
