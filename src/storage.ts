import {Injectable, OnDestroy, SimpleChange, SimpleChanges} from '@angular/core';
import {fromEvent, Observable, Subject, Subscription} from 'rxjs';

/** Provides access to the [Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage). */
export abstract class WebStorage implements Iterable<[string, string|undefined]>, OnDestroy {

  /** The handler of "changes" events. */
  private readonly _onChanges: Subject<SimpleChanges> = new Subject<SimpleChanges>();

  /** The subscription to the storage events. */
  private readonly _subscription?: Subscription;

  /**
   * Creates a new storage service.
   * @param _backend The underlying data store.
   */
  protected constructor(private _backend: Storage) {
    if (this instanceof LocalStorage) this._subscription = fromEvent(window, 'storage').subscribe(event => {
      const storageEvent = event as StorageEvent;
      if (storageEvent.key != null) this._onChanges.next({[storageEvent.key]: new SimpleChange(
        typeof storageEvent.oldValue == 'string' ? storageEvent.oldValue : undefined,
        typeof storageEvent.newValue == 'string' ? storageEvent.newValue : undefined,
        false
      )});
    });
  }

  /** The keys of this storage. */
  get keys(): string[] {
    const keys = [];
    for (let i = 0; true; i++) {
      const key = this._backend.key(i);
      if (key === null) return keys;
      keys.push(key);
    }
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
  *[Symbol.iterator](): IterableIterator<[string, string|undefined]> {
    for (const key of this.keys) yield [key, this.get(key)];
  }

  /** Removes all entries from this storage. */
  clear(): void {
    const changes: SimpleChanges = {};
    for (const [key, value] of this) changes[key] = new SimpleChange(value, undefined, false);
    this._backend.clear();
    this._onChanges.next(changes);
  }

  /**
   * Gets the value associated to the specified key.
   * @param key The key to seek for.
   * @param defaultValue The value to return if the item does not exist.
   * @return The value of the storage item, or the default value if the item is not found.
   */
  get(key: string, defaultValue?: string): string|undefined {
    const value = this._backend.getItem(key);
    return typeof value == 'string' ? value : defaultValue;
  }

  /**
   * Gets the deserialized value associated to the specified key.
   * @param key The key to seek for.
   * @param defaultValue The value to return if the item does not exist.
   * @return The deserialized value of the storage item, or the default value if the item is not found.
   */
  getObject(key: string, defaultValue?: any): any {
    try {
      const value = this.get(key);
      return typeof value == 'string' ? JSON.parse(value) : defaultValue;
    }

    catch (err) {
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

  /** Method invoked before the service is destroyed. */
  ngOnDestroy(): void {
    if (this._subscription) this._subscription.unsubscribe();
    this._onChanges.complete();
  }

  /**
   * Removes the value associated to the specified key.
   * @param key The key to seek for.
   * @return The value associated with the specified key before it was removed.
   */
  remove(key: string): string|undefined {
    const previousValue = this.get(key);
    this._backend.removeItem(key);
    this._onChanges.next({
      [key]: new SimpleChange(previousValue, undefined, false)
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

  /**
   * Converts this object to a map in JSON format.
   * @return The map in JSON format corresponding to this object.
   */
  toJSON(): Record<string, any> {
    const map: Record<string, any> = {};
    for (const [key, value] of this) map[key] = value;
    return map;
  }
}

/** Provides access to the local storage. */
@Injectable({providedIn: 'root'})
export class LocalStorage extends WebStorage {

  /** Creates a new storage service. */
  constructor() {
    super(localStorage);
  }
}

/** Provides access to the session storage. */
@Injectable({providedIn: 'root'})
export class SessionStorage extends WebStorage {

  /** Creates a new storage service. */
  constructor() {
    super(sessionStorage);
  }
}
