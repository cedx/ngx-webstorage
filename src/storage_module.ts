import {NgModule} from '@angular/core';

import {LocalStorage, SessionStorage} from './di_tokens';
import {Storage} from './storage';

/**
 * The Web Storage module.
 */
@NgModule({
  providers: [
    {provide: LocalStorage, useValue: new Storage(window.localStorage)},
    {provide: SessionStorage, useValue: new Storage(window.sessionStorage)}
  ]
})
export class NgxWebStorage {}
