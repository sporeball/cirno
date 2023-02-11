#!/usr/bin/env node

import colors from 'picocolors';

import * as cirno from './src/index.js';
import * as notifier from './src/update-notifier.js';
import * as term from './src/terminal.js';

cirno.init();
cirno.listen();

notifier.checkUpdate();
term.move(1, 1);
