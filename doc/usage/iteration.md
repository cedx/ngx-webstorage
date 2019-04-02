# Iteration
The [`LocalStorage`](api.md) and [`SessionStorage`](api.md) classes are iterable: you can go through all key/value pairs contained using a `for...of` loop. Each entry is an array with two elements (i.e. the key and the value):

```ts
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
    this._storage.set('anotherKey', 'anotherValue');

    for (const entry of storage) {
      console.log(entry);
      // Round 1: ["foo", "bar"]
      // Round 2: ["anotherKey", "anotherValue"]
    }
  }
}
```
