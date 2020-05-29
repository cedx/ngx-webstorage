import "zone.js/dist/zone";
import "zone.js/dist/zone-testing";
import {getTestBed} from "@angular/core/testing";
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from "@angular/platform-browser-dynamic/testing";

// Initialize the testing environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

// Find all the tests and load the modules.
declare const require: any;
const context = require.context(".", true, /_test\.ts$/);
context.keys().map(context);
