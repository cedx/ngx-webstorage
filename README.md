# Web Storage for Angular
![Runtime](https://img.shields.io/badge/angular-%3E%3D7.2-brightgreen.svg) ![Release](https://img.shields.io/npm/v/@cedx/ngx-webstorage.svg) ![License](https://img.shields.io/npm/l/@cedx/ngx-webstorage.svg) ![Downloads](https://img.shields.io/npm/dt/@cedx/ngx-webstorage.svg) ![Dependencies](https://david-dm.org/cedx/ngx-webstorage.js.svg) ![Coverage](https://coveralls.io/repos/github/cedx/ngx-webstorage.js/badge.svg) ![Build](https://travis-ci.com/cedx/ngx-webstorage.js.svg)

[Angular](https://angular.io) services for interacting with the [Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage), implemented in [TypeScript](https://www.typescriptlang.org).

### Programming interface
The `Storage` class has the following API:

#### `.length: number`
Returns the number of entries in the associated storage:

```javascript
```

#### `.clear()`
Removes all entries from the associated storage:

```javascript
```

#### `.get(key: string, defaultValue: any = null): string`
Returns the value associated to the specified key:

```javascript
this._storage.set('foo', 'bar');
console.log(this._storage.get('foo')); // "bar"
```

Returns the `defaultValue` parameter if the key is not found:

```javascript
console.log(this._storage.get('unknownKey')); // null
console.log(this._storage.get('unknownKey', 'foo')); // "foo"
```

#### `.getObject(key: string, defaultValue: any = null): any`
Deserializes and returns the value associated to the specified key:

```javascript
```

> The value is deserialized using the [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) method.

Returns the `defaultValue` parameter if the key is not found:

```javascript
console.log(this._storage.getObject('unknownKey')); // null
console.log(this._storage.getObject('unknownKey', false)); // false
```

### Events
Every time one or several values are changed (added, removed or updated) through the `Storage` class, a `changes` event is triggered.

This event is exposed as an [Observable](http://reactivex.io/intro.html), you can subscribe to it using the `onChanges` property:

```javascript
this._storage.onChanges.subscribe(
  changes => console.log(changes)
);
```

The changes are expressed as an array of [`KeyValueChangeRecord`](https://angular.io/api/core/KeyValueChangeRecord) instances, where a `null` reference indicates an absence of value:

```javascript
this._storage.onChanges.subscribe(changes => console.log(changes[0]));

this._storage.set('foo', 'bar');
// Prints: {key: "foo", currentValue: "bar", previousValue: null}

this._storage.set('foo', 'baz');
// Prints: {key: "foo", currentValue: "baz", previousValue: "bar"}

this._storage.remove('foo');
// Prints: {key: "foo", currentValue: null, previousValue: "baz"}
```

The values contained in the `currentValue` and `previousValue` properties of the `KeyValueChangeRecord` instances are the raw storage values. If you use the `Storage#setObject` method to change a key, you will get the serialized string value, not the original value passed to the method:

```javascript
this._storage.setObject('foo', {bar: 'baz'});
// Prints: {key: "foo", currentValue: "{\"bar\": \"baz\"}", previousValue: null}
```


## Documentation
- [User guide](https://dev.belin.io/ngx-webstorage.js)
- [API reference](https://dev.belin.io/ngx-webstorage.js/api)

## Development
- [Git repository](https://github.com/cedx/ngx-webstorage.js)
- [npm package](https://www.npmjs.com/package/@cedx/ngx-webstorage)
- [Submit an issue](https://github.com/cedx/ngx-webstorage.js/issues)

## License
[Web Storage for Angular](https://dev.belin.io/ngx-webstorage.js) is distributed under the MIT License.
