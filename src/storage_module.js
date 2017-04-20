import {NgModule} from '@angular/core';

import {LocalStorage} from './local_storage';
import {SessionStorage} from './session_storage';
import {WINDOW} from './di_tokens';

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
        LocalStorage,
        SessionStorage,
        {provide: WINDOW, useValue: window}
      ]
    })];
  }
}
