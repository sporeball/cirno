#!/usr/bin/env node

import * as cirno from './src/index.js';
// import updateNotifier from 'update-notifier';

cirno.init();
cirno.listen();

// TODO: this shows up in the normal screen buffer
// const notifier = updateNotifier({
// 	pkg: {
// 		name: 'public-ip',
// 		version: '0.9.2',
// 	},
// 	updateCheckInterval: 0
// })
// 	.notify({
//     isGlobal: true,
//     boxenOptions: {
//       padding: 1,
//       margin: 1,
//       borderColor: 'yellow',
//       borderStyle: 'round',
//       float: 'center',
//     }
//   });
