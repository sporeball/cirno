#!/usr/bin/env node

import * as cirno from './src/index.js';
import * as notifier from './src/update-notifier.js';
import { renderView } from './src/view.js';
import Splash from './src/views/splash.js';

// const file = process.argv[2];

async function cli () {
  cirno.init();
  await notifier.checkUpdate();
  // TODO: await splash instead, then render something else
  renderView(Splash);
}

cli();
