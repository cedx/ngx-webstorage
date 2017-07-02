# Web Storage for Angular
![Runtime](https://img.shields.io/badge/angular-%3E%3D4.2.5-brightgreen.svg) ![Release](https://img.shields.io/npm/v/@cedx/ngx-webstorage.svg) ![License](https://img.shields.io/npm/l/@cedx/ngx-webstorage.svg) ![Downloads](https://img.shields.io/npm/dt/@cedx/ngx-webstorage.svg) ![Dependencies](https://david-dm.org/cedx/ngx-webstorage.svg) ![Coverage](https://coveralls.io/repos/github/cedx/ngx-webstorage/badge.svg) ![Build](https://travis-ci.org/cedx/ngx-webstorage.svg)

[Angular](https://angular.io) services for interacting with the [Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage), implemented in [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript).

## Installing via [npm](https://www.npmjs.com)
From a command prompt, run:

```shell
$ npm install --save @cedx/ngx-webstorage
```

## Usage
This package provides two [injection tokens](https://angular.io/docs/js/latest/api/core/index/InjectionToken-class.html) dedicated to the Web Storage: `LocalStorage` and `SessionStorage`.

These tokens are backed by the `Storage` class which provides access to the underlying Web APIs. They need to be registered with the dependency injector by importing their module, the `StorageModule` class:

```javascript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {StorageModule} from '@cedx/ngx-webstorage';
import {AppComponent} from './app_component';

// The root module.
export class AppModule {
  
  // The class decorators.
  static get annotations() {
    return [new NgModule({
      bootstrap: [AppComponent],
      declarations: [AppComponent],
      imports: [BrowserModule, StorageModule]
    })];
  }
}
```

> The `StorageModule` provider is intended for the application root module.

Then, they will be available in the constructor of the component classes:

```javascript
import {Component} from '@angular/core';
import {LocalStorage, SessionStorage} from '@cedx/ngx-webstorage';

// The main component.
export class AppComponent {
  
  // The class decorators.
  static get annotations() {
    return [new Component({
      selector: 'my-application',
      template: '<h1>Hello World!</h1>'
    })];
  }

  // The constructor parameters.
  static get parameters() {
    return [LocalStorage, SessionStorage];
  }

  // Initializes a new instance of the class.
  constructor(localStorage, sessionStorage) {
    localStorage.get('foo');
    localStorage.getObject('bar');

    sessionStorage.set('foo', 'bar');
    sessionStorage.setObject('foo', {bar: 'baz'});
  }
}
```

### Programming interface
The `Storage` class has the following API:

#### `.keys: string[]`
Returns the list of all the keys of the associated storage:

```javascript
console.log(localStorage.keys); // []

localStorage.set('foo', 'bar');
console.log(localStorage.keys); // ["foo"]
```

#### `.length: number`
Returns the number of entries in the associated storage:

```javascript
console.log(localStorage.length); // 0

localStorage.set('foo', 'bar');
console.log(localStorage.length); // 1
```

#### `.clear()`
Removes all entries from the associated storage:

```javascript
localStorage.set('foo', 'bar');
console.log(localStorage.length); // 1

localStorage.clear();
console.log(localStorage.length); // 0
```

#### `.get(key: string, defaultValue: any = null): string`
Returns the value associated to the specified key:

```javascript
localStorage.set('foo', 'bar');
console.log(localStorage.get('foo')); // "bar"
```

Returns the `defaultValue` parameter if the key is not found:

```javascript
console.log(localStorage.get('unknownKey')); // null
console.log(localStorage.get('unknownKey', 'foo')); // "foo"
```

#### `.getObject(key: string, defaultValue: any = null): any`
Deserializes and returns the value associated to the specified key:

```javascript
localStorage.setObject('foo', {bar: 'baz'});
console.log(localStorage.getObject('foo')); // {bar: "baz"}
```

> The value is deserialized using the [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) method.

Returns the `defaultValue` parameter if the key is not found:

```javascript
console.log(localStorage.getObject('unknownKey')); // null
console.log(localStorage.getObject('unknownKey', false)); // false
```

#### `.has(key: string): boolean`
Returns a boolean value indicating whether the associated storage contains the specified key:

```javascript
console.log(localStorage.has('foo')); // false

localStorage.set('foo', 'bar');
console.log(localStorage.has('foo')); // true
```

#### `.remove(key: string)`
Removes the value associated to the specified key:

```javascript
localStorage.set('foo', 'bar');
console.log(localStorage.has('foo')); // true

localStorage.remove('foo');
console.log(localStorage.has('foo')); // false
```

#### `.set(key: string, value: string)`
Associates a given value to the specified key:

```javascript
console.log(localStorage.get('foo')); // null

localStorage.set('foo', 'bar');
console.log(localStorage.get('foo')); // "bar"
```

#### `.setObject(key: string, value: any)`
Serializes and associates a given value to the specified key:

```javascript
console.log(localStorage.getObject('foo')); // null

localStorage.setObject('foo', {bar: 'baz'});
console.log(localStorage.getObject('foo')); // {bar: "baz"}
```

> The value is serialized using the [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) method.

### Iteration
The `Storage` class is iterable: you can go through all key/value pairs contained using a `for...of` loop. Each entry is an array with two elements (e.g. the key and the value):

```javascript
localStorage.set('foo', 'bar');
localStorage.set('anotherKey', 'anotherValue');

for (let entry of localStorage) {
  console.log(entry);
  // Round 1: ["foo", "bar"]
  // Round 2: ["anotherKey", "anotherValue"] 
}
```

### Events
Every time one or several values are changed (added, removed or updated) through the `Storage` class, a `changes` event is triggered.

This event is exposed as an [Observable](http://reactivex.io/intro.html), you can subscribe to it using the `onChanges` property:

```javascript
localStorage.onChanges.subscribe(
  changes => console.log(changes)
);
```

The changes are expressed as an array of [`KeyValueChangeRecord`](https://angular.io/docs/js/latest/api/core/index/KeyValueChangeRecord-interface.html) instances, where a `null` reference indicates an absence of value:

```javascript
localStorage.onChanges.subscribe(changes => console.log(changes[0]));

localStorage.set('foo', 'bar');
// Prints: {key: "foo", currentValue: "bar", previousValue: null}

localStorage.set('foo', 'baz');
// Prints: {key: "foo", currentValue: "baz", previousValue: "bar"}

localStorage.remove('foo');
// Prints: {key: "foo", currentValue: null, previousValue: "baz"}
```

The values contained in the `currentValue` and `previousValue` properties of the `KeyValueChangeRecord` instances are the raw storage values. If you use the `Storage#setObject` method to change a key, you will get the serialized string value, not the original value passed to the method:

```javascript
localStorage.setObject('foo', {bar: 'baz'});
// Prints: {key: "foo", currentValue: "{\"bar\": \"baz\"}", previousValue: null}
```

## See also
- [API reference](https://cedx.github.io/ngx-webstorage)
- [Code coverage](https://coveralls.io/github/cedx/ngx-webstorage)
- [Continuous integration](https://travis-ci.org/cedx/ngx-webstorage)

## License
[Web Storage for Angular](https://github.com/cedx/ngx-webstorage) is distributed under the Apache License, version 2.0.
