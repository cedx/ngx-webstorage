/** A storage backend based on a [Map](https://developer.mozilla.org/en-US/docs/Web/API/Map). */
export class MapBackend implements Storage {

  /** The underlying data store. */
  private _map: Map<string, string> = new Map<string, string>();

  /** The number of entries in this backend. */
  get length(): number {
    return this._map.size;
  }

  /** Removes all entries from this backend. */
  clear(): void {
    this._map.clear();
  }

  /**
   * Gets the value associated to the specified key.
   * @param key The key to seek for.
   * @return The value of the backend item, or `null` if the item is not found.
   */
  getItem(key: string): string|null {
    return this._map.has(key) ? this._map.get(key)! : null;
  }

  /**
   * Gets the name of the key located at the specified offset.
   * @param index The offset of the key to seek for.
   * @return The key name, or `null` if the index is greater than or equal to the number of entries in this backend.
   */
  key(index: number): string|null {
    return index >= this.length ? null : [...this._map.keys()][index];
  }

  /**
   * Removes the value associated to the specified key.
   * @param key The key to seek for.
   */
  removeItem(key: string): void {
    this._map.delete(key);
  }

  /**
   * Associates a given value to the specified key.
   * @param key The key to seek for.
   * @param value The item value.
   */
  setItem(key: string, value: string): void {
    this._map.set(key, value);
  }
}
