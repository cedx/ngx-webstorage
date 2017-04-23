/**
 * Provides access to the Web storage.
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Storage
 */
export class Storage {

  /**
   * Initializes a new instance of the class.
   * @param {Storage} backend The underlying data store.
   */
  constructor(backend) {

    /**
     * The underlying data store.
     * @type {Storage}
     */
    this._backend = backend;
  }

  /**
   * The keys of this storage.
   * @type {string[]}
   */
  get keys() {
    let keys = [];
    for (let i = 0; i < this.length; i++) keys.push(this._backend.key(i));
    return keys;
  }

  /**
   * The number of entries in this storage.
   * @type {number}
   */
  get length() {
    return this._backend.length;
  }

  /**
   * Returns a new iterator that allows iterating the entries of this storage.
   */
  *[Symbol.iterator]() {
    for (let key of this.keys) yield [key, this.get(key)];
  }

  /**
   * Removes all entries from this storage.
   */
  clear() {
    this._backend.clear();
  }

  /**
   * Gets a value indicating whether this storage contains the specified key.
   * @param {string} key The key to seek for.
   * @return {boolean} `true` if this storage contains the specified key, otherwise `false`.
   */
  containsKey(key) {
    return this.keys.includes(key);
  }

  /**
   * Gets the value associated to the specified key.
   * @param {string} key The key to seek for.
   * @param {*} defaultValue The default item value if it does not exist.
   * @return {string} The value of the storage item, or the default value if the item is not found.
   */
  get(key, defaultValue = null) {
    let value = this._backend.getItem(key);
    return typeof value == 'string' ? value : defaultValue;
  }

  /**
   * Gets the deserialized value associated to the specified key.
   * @param {string} key The key to seek for.
   * @param {*} defaultValue The default item value if it does not exist.
   * @return {*} The deserialized value of the storage item, or the default value if the item is not found.
   */
  getObject(key, defaultValue = null) {
    let value = this.get(key);
    return typeof value == 'string' ? JSON.parse(value) : defaultValue;
  }

  /**
   * Removes the value associated to the specified key.
   * @param {string} key The key to seek for.
   */
  remove(key) {
    this._backend.removeItem(key);
  }

  /**
   * Associates a given value to the specified key.
   * @param {string} key The key to seek for.
   * @param {string} value The item value.
   */
  set(key, value) {
    this._backend.setItem(key, value);
  }

  /**
   * Serializes and associates a given value to the specified key.
   * @param {string} key The key to seek for.
   * @param {*} value The item value.
   */
  setObject(key, value) {
    this.set(key, JSON.stringify(value));
  }
}
