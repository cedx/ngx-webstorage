import {OnDestroy} from "@angular/core";
import {fromEvent, Observable, Subject, Subscription} from "rxjs";

/** Provides access to the [Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage). */
export abstract class WebStorage implements Iterable<[string, string|undefined]>, OnDestroy {

	/** The handler of "change" events. */
	private readonly _onChange: Subject<StorageEvent> = new Subject<StorageEvent>();

	/** The subscription to the storage events. */
	private readonly _subscription: Subscription;

	/**
	 * Creates a new storage service.
	 * @param _backend The underlying data store.
	 */
	protected constructor(private readonly _backend: Storage) {
		this._subscription = fromEvent<StorageEvent>(window, "storage").subscribe(event => {
			if (event.storageArea == this._backend) this._emit(event.key, event.oldValue ?? undefined, event.newValue ?? undefined, event.url);
		});
	}

	/** The keys of this storage. */
	get keys(): string[] {
		const keys = [];
		for (let i = 0; ; i++) { // eslint-disable-line no-constant-condition
			const key = this._backend.key(i);
			if (key == null) return keys;
			keys.push(key);
		}
	}

	/** The number of entries in this storage. */
	get length(): number {
		return this._backend.length;
	}

	/** The stream of "change" events. */
	get onChange(): Observable<StorageEvent> {
		return this._onChange.asObservable();
	}

	/**
	 * Returns a new iterator that allows iterating the entries of this storage.
	 * @return An iterator for the entries of this storage.
	 */
	*[Symbol.iterator](): IterableIterator<[string, string]> {
		for (const key of this.keys) yield [key, this.get(key)!];
	}

	/** Removes all entries from this storage. */
	clear(): void {
		this._backend.clear();
		this._emit(null);
	}

	/**
	 * Gets the value associated to the specified key.
	 * @param key The key to seek for.
	 * @param defaultValue The value to return if the item does not exist.
	 * @return The value of the storage item, or the default value if the item is not found.
	 */
	get(key: string, defaultValue?: string): string|undefined {
		return this._backend.getItem(key) ?? defaultValue;
	}

	/**
	 * Gets the deserialized value associated to the specified key.
	 * @param key The key to seek for.
	 * @param defaultValue The value to return if the item does not exist.
	 * @return The deserialized value of the storage item, or the default value if the item is not found.
	 */
	getObject(key: string, defaultValue?: any): any {
		try {
			const value = this._backend.getItem(key);
			return value != null ? JSON.parse(value) : defaultValue;
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
		return this._backend.getItem(key) != null;
	}

	/** Method invoked before the service is destroyed. */
	ngOnDestroy(): void {
		this._subscription.unsubscribe();
		this._onChange.complete();
	}

	/**
	 * Looks up the value of the specified key, or add a new value if it isn't there.
	 *
	 * Returns the value associated to `key`, if there is one. Otherwise calls `ifAbsent` to get a new value,
	 * associates `key` to that value, and then returns the new value.
	 *
	 * @param key The key to seek for.
	 * @param ifAbsent The function called to get a new value.
	 * @return The value associated with the specified key.
	 */
	putIfAbsent(key: string, ifAbsent: () => string): string {
		if (!this.has(key)) this.set(key, ifAbsent());
		return this.get(key)!;
	}

	/**
	 * Looks up the value of the specified key, or add a new value if it isn't there.
	 *
	 * Returns the deserialized value associated to `key`, if there is one. Otherwise calls `ifAbsent` to get a new value,
	 * serializes and associates `key` to that value, and then returns the new value.
	 *
	 * @param key The key to seek for.
	 * @param ifAbsent The function called to get a new value.
	 * @return The deserialized value associated with the specified key.
	 */
	putObjectIfAbsent(key: string, ifAbsent: () => any): any {
		if (!this.has(key)) this.setObject(key, ifAbsent());
		return this.getObject(key);
	}

	/**
	 * Removes the value associated to the specified key.
	 * @param key The key to seek for.
	 * @return The value associated with the specified key before it was removed.
	 */
	remove(key: string): string|undefined {
		const oldValue = this.get(key);
		this._backend.removeItem(key);
		this._emit(key, oldValue);
		return oldValue;
	}

	/**
	 * Associates a given value to the specified key.
	 * @param key The key to seek for.
	 * @param value The item value.
	 * @return This instance.
	 */
	set(key: string, value: string): this {
		const oldValue = this.get(key);
		this._backend.setItem(key, value);
		this._emit(key, oldValue, value);
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
	toJSON(): Record<string, string> {
		const map: Record<string, string> = {};
		for (const [key, value] of this) map[key] = value;
		return map;
	}

	/**
	 * Emits a new storage event.
	 */
	private _emit(key: string|null, oldValue?: string, newValue?: string, url?: string): void {
		this._onChange.next(new StorageEvent("change", {
			key,
			newValue,
			oldValue,
			storageArea: this._backend,
			url: url ?? location.href
		}));
	}
}
