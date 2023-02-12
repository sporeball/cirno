#!/usr/bin/env node

import * as cirno from './src/index.js';
import * as notifier from './src/update-notifier.js';
import { renderView } from './src/view.js';
import Splash from './src/views/splash.js';

cirno.init();

notifier.checkUpdate();

renderView(Splash);
