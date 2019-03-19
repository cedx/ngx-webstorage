import {InjectionToken} from '@angular/core';

/**
 * An injection token representing the local storage.
 * @type {InjectionToken}
 */
export const localStorage = new InjectionToken('storage.local');

/**
 * An injection token representing the session storage.
 * @type {InjectionToken}
 */
export const sessionStorage = new InjectionToken('storage.session');
