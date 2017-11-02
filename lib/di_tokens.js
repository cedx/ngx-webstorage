import {InjectionToken} from '@angular/core';

/**
 * An injection token representing the local storage.
 * @type {InjectionToken}
 */
export const LocalStorage = new InjectionToken('LocalStorage');

/**
 * An injection token representing the session storage.
 * @type {InjectionToken}
 */
export const SessionStorage = new InjectionToken('SessionStorage');
