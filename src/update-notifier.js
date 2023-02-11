import colors from 'picocolors';
import { pEvent } from 'p-event';
import updateNotifier from 'update-notifier';

import emitter from './event.js';
import * as term from './terminal.js';

export async function checkUpdate () {
  const notifier = updateNotifier({
    pkg: {
      // name: 'public-ip',
      name: '@sporeball/cirno',
      version: global.cirno.version
    },
    updateCheckInterval: 0
  });
  if (notifier.update) {
    // move to center
    term.move(
      1, // don't care - will be floated
      Math.floor(process.stdout.rows / 2) - 4
    );
    // notify
    notifier.notify({
      defer: false,
      isGlobal: true,
      message: `Update available ${colors.yellow(`{currentVersion}`)} → ${colors.green(`{latestVersion}`)}\nRun ${colors.cyan(`{updateCommand}`)} to update\n\n${colors.gray('Press any key to continue')}`,
      boxenOptions: {
        padding: 1,
        margin: 1,
        borderColor: 'yellow',
        borderStyle: 'round',
        float: 'center'
      }
    });
    // wait for keypress
    await pEvent(emitter, 'keypress');
    term.clear();
  }
}
