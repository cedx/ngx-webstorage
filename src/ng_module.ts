import {DOCUMENT} from '@angular/common';
import {NgModule} from '@angular/core';

import {Storage} from './storage';
import {localStorage, sessionStorage} from './tokens';

/**
 * The Web Storage module.
 */
@NgModule({
  providers: [
    {provide: localStorage, useValue: new Storage(window.localStorage)},
    {provide: sessionStorage, useValue: new Storage(window.sessionStorage)}
  ]
})
export class NgxWebStorage {}
