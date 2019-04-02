path: blob/master
source: src/storage.ts

# Programming interface
This package provides two services dedicated to the Web Storage: the `LocalStorage` and `SessionStorage` classes.

```ts
import {WebStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const storage = new WebStorage;

  storage.set('foo', 'bar');
  console.log(storage.get('foo')); // "bar"

  storage.setObject('foo', {baz: 'qux'});
  console.log(storage.getObject('foo')); // {baz: "qux"}
}
```

The `WebStorage` class has the following API:

## **#defaults**: CookieOptions
Returns the default [options](options.md) to pass when setting storage:

```ts
import {WebStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const storage = new WebStorage;
  console.log(JSON.stringify(storage.defaults));
  // {"domain": "", "expires": null, "path": "", "secure": false}

  storage.defaults.domain = 'domain.com';
  storage.defaults.path = '/www';
  storage.defaults.secure = true;

  console.log(JSON.stringify(storage.defaults));
  // {"domain": "domain.com", "expires": null, "path": "/www", "secure": true}
}
```

## **#keys**: string[]
Returns the keys of the storage associated with the current document:

```ts
import {WebStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const storage = new WebStorage;
  console.log(storage.keys); // []

  storage.set('foo', 'bar');
  console.log(storage.keys); // ["foo"]
}
```

## **#length**: number
Returns the number of storage associated with the current document:

```ts
import {WebStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const storage = new WebStorage;
  console.log(storage.length); // 0

  storage.set('foo', 'bar');
  console.log(storage.length); // 1
}
```

## **#clear**(): void
Removes all storage associated with the current document:

```ts
import {WebStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const storage = new WebStorage;
  storage.set('foo', 'bar');
  console.log(storage.length); // 1

  storage.clear();
  console.log(storage.length); // 0
}
```

## **#get**(key: string, defaultValue?: string): string | undefined
Returns the value associated to the specified key:

```ts
import {WebStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const storage = new WebStorage;
  console.log(storage.get('foo')); // undefined
  console.log(storage.get('foo', 'qux')); // "qux"

  storage.set('foo', 'bar');
  console.log(storage.get('foo')); // "bar"
}
```

Returns `undefined` or the given default value if the key is not found.

## **#getObject**(key: string, defaultValue?: any): any
Deserializes and returns the value associated to the specified key:

```ts
import {WebStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const storage = new WebStorage;
  console.log(storage.getObject('foo')); // undefined
  console.log(storage.getObject('foo', 'qux')); // "qux"
  
  storage.setObject('foo', {bar: 'baz'});
  console.log(storage.getObject('foo')); // {bar: "baz"}
}
```

!!! info
    The value is deserialized using the [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) method.

Returns `undefined` or the given default value if the key is not found.

## **#has**(key: string): boolean
Returns a boolean value indicating whether the current document has a cookie with the specified key:

```ts
import {WebStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const storage = new WebStorage;
  console.log(storage.has('foo')); // false

  storage.set('foo', 'bar');
  console.log(storage.has('foo')); // true
}
```

## **#remove**(key: string, options: Partial&lt;CookieOptions&gt; = {}): string
Removes the value associated to the specified key:

```ts
import {WebStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const storage = new WebStorage;

  storage.set('foo', 'bar');
  console.log(storage.has('foo')); // true

  console.log(storage.remove('foo')); // "bar"
  console.log(storage.has('foo')); // false
}
```

## **#set**(key: string, value: string, options: Partial&lt;CookieOptions&gt; = {}): this
Associates a given value to the specified key:

```ts
import {WebStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const storage = new WebStorage;
  console.log(storage.get('foo')); // undefined

  storage.set('foo', 'bar');
  console.log(storage.get('foo')); // "bar"
}
```

## **#setObject**(key: string, value: any, options: Partial&lt;CookieOptions&gt; = {}): this
Serializes and associates a given value to the specified key:

```ts
import {WebStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const storage = new WebStorage;
  console.log(storage.getObject('foo')); // undefined

  storage.setObject('foo', {bar: 'baz'});
  console.log(storage.getObject('foo')); // {bar: "baz"}
}
```

!!! info
    The value is serialized using the [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) method.
