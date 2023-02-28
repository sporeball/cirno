#!/usr/bin/env node

import * as cirno from './src/index.js';
// import log from './src/log.js';
import * as project from './src/project.js';
import * as notifier from './src/update-notifier.js';

const file = process.argv[2];

async function cli () {
  cirno.init();
  await notifier.checkUpdate();
  // TODO: await splash instead, then render something else
  // renderView(Splash);
  if (file) {
    global.cirno.project = project.read(file);
    project.draw();
  }
}

cli();
