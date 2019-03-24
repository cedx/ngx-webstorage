path: blob/master
source: src/storage.ts

# Programming interface
This package provides a service dedicated to the cookie management: the `BaseStorage` class.

```ts
import {BaseStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const cookies = new BaseStorage;

  cookies.set('foo', 'bar');
  console.log(cookies.get('foo')); // "bar"

  cookies.setObject('foo', {baz: 'qux'});
  console.log(cookies.getObject('foo')); // {baz: "qux"}
}
```

The `BaseStorage` class has the following API:

## **#defaults**: CookieOptions
Returns the default [options](options.md) to pass when setting cookies:

```ts
import {BaseStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const cookies = new BaseStorage;
  console.log(JSON.stringify(cookies.defaults));
  // {"domain": "", "expires": null, "path": "", "secure": false}

  cookies.defaults.domain = 'domain.com';
  cookies.defaults.path = '/www';
  cookies.defaults.secure = true;

  console.log(JSON.stringify(cookies.defaults));
  // {"domain": "domain.com", "expires": null, "path": "/www", "secure": true}
}
```

## **#keys**: string[]
Returns the keys of the cookies associated with the current document:

```ts
import {BaseStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const cookies = new BaseStorage;
  console.log(cookies.keys); // []

  cookies.set('foo', 'bar');
  console.log(cookies.keys); // ["foo"]
}
```

## **#length**: number
Returns the number of cookies associated with the current document:

```ts
import {BaseStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const cookies = new BaseStorage;
  console.log(cookies.length); // 0

  cookies.set('foo', 'bar');
  console.log(cookies.length); // 1
}
```

## **#clear**(): void
Removes all cookies associated with the current document:

```ts
import {BaseStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const cookies = new BaseStorage;
  cookies.set('foo', 'bar');
  console.log(cookies.length); // 1

  cookies.clear();
  console.log(cookies.length); // 0
}
```

## **#get**(key: string, defaultValue?: string): string | undefined
Returns the value associated to the specified key:

```ts
import {BaseStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const cookies = new BaseStorage;
  console.log(cookies.get('foo')); // undefined
  console.log(cookies.get('foo', 'qux')); // "qux"

  cookies.set('foo', 'bar');
  console.log(cookies.get('foo')); // "bar"
}
```

Returns `undefined` or the given default value if the key is not found.

## **#getObject**(key: string, defaultValue?: any): any
Deserializes and returns the value associated to the specified key:

```ts
import {BaseStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const cookies = new BaseStorage;
  console.log(cookies.getObject('foo')); // undefined
  console.log(cookies.getObject('foo', 'qux')); // "qux"
  
  cookies.setObject('foo', {bar: 'baz'});
  console.log(cookies.getObject('foo')); // {bar: "baz"}
}
```

!!! info
    The value is deserialized using the [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) method.

Returns `undefined` or the given default value if the key is not found.

## **#has**(key: string): boolean
Returns a boolean value indicating whether the current document has a cookie with the specified key:

```ts
import {BaseStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const cookies = new BaseStorage;
  console.log(cookies.has('foo')); // false

  cookies.set('foo', 'bar');
  console.log(cookies.has('foo')); // true
}
```

## **#remove**(key: string, options: Partial&lt;CookieOptions&gt; = {}): string
Removes the value associated to the specified key:

```ts
import {BaseStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const cookies = new BaseStorage;

  cookies.set('foo', 'bar');
  console.log(cookies.has('foo')); // true

  console.log(cookies.remove('foo')); // "bar"
  console.log(cookies.has('foo')); // false
}
```

## **#set**(key: string, value: string, options: Partial&lt;CookieOptions&gt; = {}): this
Associates a given value to the specified key:

```ts
import {BaseStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const cookies = new BaseStorage;
  console.log(cookies.get('foo')); // undefined

  cookies.set('foo', 'bar');
  console.log(cookies.get('foo')); // "bar"
}
```

## **#setObject**(key: string, value: any, options: Partial&lt;CookieOptions&gt; = {}): this
Serializes and associates a given value to the specified key:

```ts
import {BaseStorage} from '@cedx/ngx-webstorage';

function main(): void {
  const cookies = new BaseStorage;
  console.log(cookies.getObject('foo')); // undefined

  cookies.setObject('foo', {bar: 'baz'});
  console.log(cookies.getObject('foo')); // {bar: "baz"}
}
```

!!! info
    The value is serialized using the [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) method.
