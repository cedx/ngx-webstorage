import 'zone.js/dist/zone.js';
import 'zone.js/dist/zone-testing.js';

import {getTestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';

// Initialize the testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

// Find all the tests.
declare const require: any;
const context = require.context('.', true, /_test\.ts$/);
context.keys().map(context);
