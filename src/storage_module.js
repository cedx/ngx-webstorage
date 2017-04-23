import {NgModule} from '@angular/core';

import {LocalStorage, SessionStorage} from './di_tokens';
import {Storage} from './storage';

/**
 * The Web Storage module.
 */
export class StorageModule {

  /**
   * The class decorators.
   * @type {Array}
   */
  static get annotations() {
    return [new NgModule({
      providers: [
        {provide: LocalStorage, useValue: new Storage(window.localStorage)},
        {provide: SessionStorage, useValue: new Storage(window.sessionStorage)}
      ]
    })];
  }
}
