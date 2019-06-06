import {DOCUMENT} from '@angular/common';
import {Inject, Injectable, SimpleChange, SimpleChanges} from '@angular/core';
import {Observable, Subject} from 'rxjs';

/** Provides access to the {@link https://developer.mozilla.org/en-US/docs/Web/API/Storage|Web Storage}. */
export abstract class WebStorage {

  /** The handler of "changes" events. */
  private _onChanges: Subject<SimpleChanges> = new Subject<SimpleChanges>();

  /**
   * Creates a new storage service.
   * @param _backend The underlying data store.
   */
  protected constructor(private _backend: Storage) {}

  /** The keys of this storage. */
  get keys(): string[] {
    const keys = [];
    for (let i = 0; i < this.length; i++) keys.push(this._backend.key(i) as string);
    return keys;
  }

  /** The number of entries in this storage. */
  get length(): number {
    return this._backend.length;
  }

  /** The stream of "changes" events. */
  get onChanges(): Observable<SimpleChanges> {
    return this._onChanges.asObservable();
  }

  /**
   * Returns a new iterator that allows iterating the entries of this storage.
   * @return An iterator for the entries of this storage.
   */
  *[Symbol.iterator](): IterableIterator<[string, string | null]> {
    for (const key of this.keys) yield [key, this.get(key)];
  }

  /** Removes all entries from this storage. */
  clear(): void {
    const changes: SimpleChanges = {};
    for (const [key, value] of this) changes[key] = new SimpleChange(value, null, false);
    this._backend.clear();
    this._onChanges.next(changes);
  }

  /**
   * Gets the value associated to the specified key.
   * @param key The key to seek for.
   * @param defaultValue The default item value if it does not exist.
   * @return The value of the storage item, or the default value if the item is not found.
   */
  get(key: string, defaultValue: string | null = null): string | null {
    const value = this._backend.getItem(key);
    return typeof value == 'string' ? value : defaultValue;
  }

  /**
   * Gets the deserialized value associated to the specified key.
   * @param key The key to seek for.
   * @param defaultValue The default item value if it does not exist.
   * @return The deserialized value of the storage item, or the default value if the item is not found.
   */
  getObject(key: string, defaultValue: any = null): any {
    try {
      const value = this.get(key);
      return typeof value == 'string' ? JSON.parse(value) : defaultValue;
    }

    catch {
      return defaultValue;
    }
  }

  /**
   * Gets a value indicating whether this storage contains the specified key.
   * @param key The key to seek for.
   * @return `true` if this storage contains the specified key, otherwise `false`.
   */
  has(key: string): boolean {
    return this.keys.includes(key);
  }

  /**
   * Removes the value associated to the specified key.
   * @param key The key to seek for.
   * @return The value associated with the specified key before it was removed.
   */
  remove(key: string): string | null {
    const previousValue = this.get(key);
    this._backend.removeItem(key);
    this._onChanges.next({
      [key]: new SimpleChange(previousValue, null, false)
    });

    return previousValue;
  }

  /**
   * Associates a given value to the specified key.
   * @param key The key to seek for.
   * @param value The item value.
   * @return This instance.
   */
  set(key: string, value: string): this {
    const previousValue = this.get(key);
    this._backend.setItem(key, value);
    this._onChanges.next({
      [key]: new SimpleChange(previousValue, value, false)
    });

    return this;
  }

  /**
   * Serializes and associates a given value to the specified key.
   * @param key The key to seek for.
   * @param value The item value.
   * @return This instance.
   */
  setObject(key: string, value: any): this {
    return this.set(key, JSON.stringify(value));
  }
}

/**
 * Provides access to the local storage.
 * @dynamic
 */
@Injectable({providedIn: 'root'})
export class LocalStorage extends WebStorage {

  /**
   * Creates a new storage service.
   * @param document The current HTML document.
   */
  constructor(@Inject(DOCUMENT) document: Document) {
    super((document.defaultView as Window).localStorage);
  }
}

/**
 * Provides access to the session storage.
 * @dynamic
 */
@Injectable({providedIn: 'root'})
export class SessionStorage extends WebStorage {

  /**
   * Creates a new storage service.
   * @param document The current HTML document.
   */
  constructor(@Inject(DOCUMENT) document: Document) {
    super((document.defaultView as Window).sessionStorage);
  }
}
