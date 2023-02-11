import View from '../view.js';
import { Text } from '../ui.js';

const Splash = new View('splash')
  .addText({ name: 'cirno', x: 1, y: 1, value: 'cirno', color: 'cyan', bold: true })
  .addText({ name: 'bow', x: 7, y: 1, value: '୨୧', color: 'blue' });

export default Splash;
