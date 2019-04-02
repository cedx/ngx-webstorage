# Events
The [`DomStorage`](api.md) class is an [`EventEmitter`](https://nodejs.org/api/events.html): every time one or several values are changed (added, removed or updated) through this class, a `changes` event is triggered.

You can subscribe to this event using the `on()` method:

```ts
import {DomStorage} from '@cedx/ngx-webstorage';

function main(): void {
  new DomStorage().on(DomStorage.eventChanges, changes => {
    for (const [key, value] of changes.entries()) console.log(`${key}: ${value}`);
  });
}
```

The changes are expressed as a [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) of [`SimpleChange`](https://github.com/cedx/ngx-webstorage.js/blob/master/src/simple_change.ts) instances, where an `undefined` property indicates an absence of value:

```ts
import {DomStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const cookies = new DomStorage;

  cookies.on(DomStorage.eventChanges, changes => {
    for (const [key, change] of changes.entries()) console.log({
      key,
      current: change.currentValue,
      previous: change.previousValue
    });
  });

  cookies.set('foo', 'bar');
  // Prints: {key: "foo", current: "bar", previous: undefined}

  cookies.set('foo', 'baz');
  // Prints: {key: "foo", current: "baz", previous: "bar"}

  cookies.remove('foo');
  // Prints: {key: "foo", current: undefined, previous: "baz"}
}
```

The values contained in the `currentValue` and `previousValue` properties of the `SimpleChange` instances are the raw cookie values. If you use the `DomStorage#setObject()` method to set a cookie, you will get the serialized string value, not the original value passed to the method:

```ts
import {DomStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const cookies = new DomStorage;
  cookies.setObject('foo', {bar: 'baz'});
  // Prints: {key: "foo", current: "{\"bar\": \"baz\"}", previous: undefined}
}
```
