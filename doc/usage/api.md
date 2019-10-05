path: blob/master
source: src/storage.ts

# Programming interface
This package provides two services dedicated to the Web Storage: the `LocalStorage` and `SessionStorage` classes.

```typescript
import {Component, OnInit} from '@angular/core';
import {LocalStorage} from '@cedx/ngx-webstorage';

@Component({
  selector: 'my-component',
  templateUrl: './my-component.html'
})
export class MyComponent implements OnInit {
  constructor(private _storage: LocalStorage) {}
  
  ngOnInit(): void {
    this._storage.set('foo', 'bar');
    console.log(this._storage.get('foo')); // "bar"

    this._storage.setObject('foo', {baz: 'qux'});
    console.log(this._storage.getObject('foo')); // {baz: "qux"}
  }
}
```

Each class extends from the `WebStorage` abstract class that has the following API:

## **#keys**: string[]
Returns the keys of the the associated storage:

```typescript
import {Component, OnInit} from '@angular/core';
import {LocalStorage} from '@cedx/ngx-webstorage';

@Component({
  selector: 'my-component',
  templateUrl: './my-component.html'
})
export class MyComponent implements OnInit {
  constructor(private _storage: LocalStorage) {}
  
  ngOnInit(): void {
    console.log(this._storage.keys); // []
    
    this._storage.set('foo', 'bar');
    console.log(this._storage.keys); // ["foo"]
  }
}
```

## **#length**: number
Returns the number of entries in the associated storage:

```typescript
import {Component, OnInit} from '@angular/core';
import {LocalStorage} from '@cedx/ngx-webstorage';

@Component({
  selector: 'my-component',
  templateUrl: './my-component.html'
})
export class MyComponent implements OnInit {
  constructor(private _storage: LocalStorage) {}
  
  ngOnInit(): void {
    console.log(this._storage.length); // 0
    
    this._storage.set('foo', 'bar');
    console.log(this._storage.length); // 1
  }
}
```

## **#clear**(): void
Removes all entries from the associated storage:

```typescript
import {Component, OnInit} from '@angular/core';
import {LocalStorage} from '@cedx/ngx-webstorage';

@Component({
  selector: 'my-component',
  templateUrl: './my-component.html'
})
export class MyComponent implements OnInit {
  constructor(private _storage: LocalStorage) {}
  
  ngOnInit(): void {
    this._storage.set('foo', 'bar');
    console.log(this._storage.length); // 1
    
    this._storage.clear();
    console.log(this._storage.length); // 0
  }
}
```

## **#get**(key: string, defaultValue?: string): string|undefined
Returns the value associated to the specified key:

```typescript
import {Component, OnInit} from '@angular/core';
import {LocalStorage} from '@cedx/ngx-webstorage';

@Component({
  selector: 'my-component',
  templateUrl: './my-component.html'
})
export class MyComponent implements OnInit {
  constructor(private _storage: LocalStorage) {}
  
  ngOnInit(): void {
    console.log(this._storage.get('foo')); // undefined
    console.log(this._storage.get('foo', 'qux')); // "qux"

    this._storage.set('foo', 'bar');
    console.log(this._storage.get('foo')); // "bar"
  }
}
```

Returns `undefined` or the given default value if the key is not found.

## **#getObject**(key: string, defaultValue?: any): any
Deserializes and returns the value associated to the specified key:

```typescript
import {Component, OnInit} from '@angular/core';
import {LocalStorage} from '@cedx/ngx-webstorage';

@Component({
  selector: 'my-component',
  templateUrl: './my-component.html'
})
export class MyComponent implements OnInit {
  constructor(private _storage: LocalStorage) {}
  
  ngOnInit(): void {
    console.log(this._storage.getObject('foo')); // undefined
    console.log(this._storage.getObject('foo', 'qux')); // "qux"
  
    this._storage.setObject('foo', {bar: 'baz'});
    console.log(this._storage.getObject('foo')); // {bar: "baz"}
  }
}
```

!!! info
    The value is deserialized using the [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) method.

Returns `undefined` or the given default value if the key is not found.

## **#has**(key: string): boolean
Returns a boolean value indicating whether the associated storage contains the specified key:

```typescript
import {Component, OnInit} from '@angular/core';
import {LocalStorage} from '@cedx/ngx-webstorage';

@Component({
  selector: 'my-component',
  templateUrl: './my-component.html'
})
export class MyComponent implements OnInit {
  constructor(private _storage: LocalStorage) {}
  
  ngOnInit(): void {
    console.log(this._storage.has('foo')); // false
    
    this._storage.set('foo', 'bar');
    console.log(this._storage.has('foo')); // true
  }
}
```

## **#remove**(key: string): string|undefined
Removes the value associated to the specified key:

```typescript
import {Component, OnInit} from '@angular/core';
import {LocalStorage} from '@cedx/ngx-webstorage';

@Component({
  selector: 'my-component',
  templateUrl: './my-component.html'
})
export class MyComponent implements OnInit {
  constructor(private _storage: LocalStorage) {}
  
  ngOnInit(): void {
    this._storage.set('foo', 'bar');
    console.log(this._storage.has('foo')); // true
    
    console.log(this._storage.remove('foo')); // "bar"
    console.log(this._storage.has('foo')); // false
  }
}
```

Returns the value associated with the specified key before it was removed.

## **#set**(key: string, value: string): this
Associates a given value to the specified key:

```typescript
import {Component, OnInit} from '@angular/core';
import {LocalStorage} from '@cedx/ngx-webstorage';

@Component({
  selector: 'my-component',
  templateUrl: './my-component.html'
})
export class MyComponent implements OnInit {
  constructor(private _storage: LocalStorage) {}
  
  ngOnInit(): void {
    console.log(this._storage.get('foo')); // undefined
    
    this._storage.set('foo', 'bar');
    console.log(this._storage.get('foo')); // "bar"
  }
}
```

## **#setObject**(key: string, value: any): this
Serializes and associates a given value to the specified key:

```typescript
import {Component, OnInit} from '@angular/core';
import {LocalStorage} from '@cedx/ngx-webstorage';

@Component({
  selector: 'my-component',
  templateUrl: './my-component.html'
})
export class MyComponent implements OnInit {
  constructor(private _storage: LocalStorage) {}
  
  ngOnInit(): void {
    console.log(this._storage.getObject('foo')); // undefined
    
    this._storage.setObject('foo', {bar: 'baz'});
    console.log(this._storage.getObject('foo')); // {bar: "baz"}
  }
}
```

!!! info
    The value is serialized using the [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) method.
