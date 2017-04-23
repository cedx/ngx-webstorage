import {Injectable} from '@angular/core';
import {WINDOW} from './di_tokens';
import {WebStorage} from './web_storage';

/**
 * Provides access to the session storage.
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
 */
export class SessionStorage extends WebStorage {

  /**
   * The class decorators.
   * @type {Array}
   */
  static get annotations() {
    return [new Injectable()];
  }

  /**
   * The constructor parameters.
   * @type {Array}
   */
  static get parameters() {
    return [WINDOW];
  }

  /**
   * Initializes a new instance of the class.
   * @param {Window} window The underlying browser's window.
   */
  constructor(window) {
    super(window.sessionStorage);
  }
}
