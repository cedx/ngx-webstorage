# Events
Every time one or several values are changed (added, removed or updated) through the `LocalStorage` or `SessionStorage` class, a `changes` event is triggered.

This event is exposed as an [Observable](https://angular.io/guide/observables), you can subscribe to it using the `onChanges` property:

```typescript
import {Component, OnInit, SimpleChanges} from '@angular/core';
import {LocalStorage} from '@cedx/ngx-webstorage';

@Component({
  selector: 'my-component',
  templateUrl: './my-component.html'
})
export class MyComponent implements OnInit {
  constructor(private _storage: LocalStorage) {}
  
  ngOnInit(): void {
    this._storage.onChanges.subscribe((changes: SimpleChanges) => {
      for (const [key, value] of Object.entries(changes)) console.log(`${key}: ${JSON.stringify(value)}`);
    });
  }
}
```

The changes are expressed as a map of [`SimpleChange`](https://angular.io/api/core/SimpleChange) instances, where an `undefined` property indicates an absence of value:

```typescript
import {Component, OnInit, SimpleChanges} from '@angular/core';
import {LocalStorage} from '@cedx/ngx-webstorage';

@Component({
  selector: 'my-component',
  templateUrl: './my-component.html'
})
export class MyComponent implements OnInit {
  constructor(private _storage: LocalStorage) {}
  
  ngOnInit(): void {
    this._storage.onChanges.subscribe((changes: SimpleChanges) => {
      for (const [key, change] of Object.entries(changes)) console.log({
        key,
        current: change.currentValue,
        previous: change.previousValue
      });
    });

    this._storage.set('foo', 'bar');
    // Prints: {key: "foo", current: "bar", previous: undefined}

    this._storage.set('foo', 'baz');
    // Prints: {key: "foo", current: "baz", previous: "bar"}

    this._storage.remove('foo');
    // Prints: {key: "foo", current: undefined, previous: "baz"}
  }
}
```

The values contained in the `currentValue` and `previousValue` properties of the `SimpleChange` instances are the raw storage values. If you use the `WebStorage#setObject()` method to store a value, you will get the serialized string value, not the original value passed to the method:

```typescript
import {Component, OnInit} from '@angular/core';
import {SessionStorage} from '@cedx/ngx-webstorage';

@Component({
  selector: 'my-component',
  templateUrl: './my-component.html'
})
export class MyComponent implements OnInit {
  constructor(private _storage: SessionStorage) {}
  
  ngOnInit(): void {
    this._storage.setObject('foo', {bar: 'baz'});
    // Prints: {key: "foo", current: "{\"bar\": \"baz\"}", previous: undefined}
  }
}
```
