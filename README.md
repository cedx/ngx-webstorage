# Web Storage for Angular
![Release](https://img.shields.io/npm/v/@cedx/ngx-storage.svg) ![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg) ![Dependencies](https://david-dm.org/cedx/ngx-storage.svg) ![Coverage](https://coveralls.io/repos/github/cedx/ngx-storage/badge.svg) ![Build](https://travis-ci.org/cedx/ngx-storage.svg)

[Angular](https://angular.io) services for interacting with the [Web Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage), implemented in [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript).


## Installing via [npm](https://www.npmjs.com)
From a command prompt, run:

```shell
$ npm install --save @cedx/ngx-storage
```

## Usage
This package provides two [@Injectable](https://angular.io/docs/js/latest/api/core/index/Injectable-decorator.html) services dedicated to the Web Storage: `LocalStorage` and `SessionStorage`.

They need to be registered with the dependency injector by importing their module, the `StorageModule` class:

```javascript
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {StorageModule} from '@cedx/ngx-storage';
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

Then, they will be available in the constructor of the component classes:

```javascript
import {Component} from '@angular/core';
import {LocalStorage, SessionStorage} from '@cedx/ngx-storage';

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

### Iteration
The provided classes are iterable: you can go through all key/value pairs contained using a `for...of` loop. Each entry is an array with two elements (e.g. the key and the value):

```javascript
localStorage.set('foo', 'bar');
localStorage.set('anotherKey', 'anotherValue');

for (let entry of localStorage) {
  console.log(entry);
  // Round 1: ["foo", "bar"]
  // Round 2: ["anotherKey", "anotherValue"] 
}
```

### Programming interface
The two services share the same API:

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

#### `.containsKey(key: string): boolean`
Returns a boolean value indicating whether the associated storage contains the specified key:

```javascript
console.log(localStorage.containsKey('foo')); // false

localStorage.set('foo', 'bar');
console.log(localStorage.containsKey('foo')); // true
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
console.log(localStorage.get('unknownKey')); // null
console.log(localStorage.get('unknownKey', false)); // false
```

#### `.remove(key: string)`
Removes the value associated to the specified key:

```javascript
localStorage.set('foo', 'bar');
console.log(localStorage.containsKey('foo')); // true

localStorage.remove('foo');
console.log(localStorage.containsKey('foo')); // false
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

## See also
- [API reference](https://cedx.github.io/ngx-storage)
- [Code coverage](https://coveralls.io/github/cedx/ngx-storage)
- [Continuous integration](https://travis-ci.org/cedx/ngx-storage)

## License
[Web Storage for Angular](https://github.com/cedx/ngx-storage) is distributed under the Apache License, version 2.0.
