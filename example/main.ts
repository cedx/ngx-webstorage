/* eslint-disable capitalized-comments, line-comment-position */
import {Component, OnInit} from '@angular/core';
import {LocalStorage} from '@cedx/ngx-webstorage';

/** A component that demonstrates the usage of the [[LocalStorage]] service. */
@Component({
  selector: 'my-component',
  templateUrl: './my-component.html'
})
export class MyComponent implements OnInit {
  constructor(private _storage: LocalStorage) {}

  ngOnInit(): void {
    // Query the storage.
    console.log(this._storage.has('foo')); // false
    console.log(this._storage.has('baz')); // false
    console.log(this._storage.length); // 0
    console.log(this._storage.keys); // []

    // Write to the storage.
    this._storage.set('foo', 'bar');
    console.log(this._storage.has('foo')); // true
    console.log(this._storage.length); // 1
    console.log(this._storage.keys); // ["foo"]

    this._storage.setObject('baz', {qux: 123});
    console.log(this._storage.has('baz')); // true
    console.log(this._storage.length); // 2
    console.log(this._storage.keys); // ["foo", "baz"]

    // Read the storage.
    console.log(this._storage.get('foo').constructor.name); // "String"
    console.log(this._storage.get('foo')); // "bar"

    console.log(this._storage.getObject('baz').constructor.name); // "Object"
    console.log(this._storage.getObject('baz')); // {qux: 123}
    console.log(this._storage.getObject('baz').qux); // 123

    // Delete from the storage.
    this._storage.remove('foo');
    console.log(this._storage.has('foo')); // false
    console.log(this._storage.length); // 1
    console.log(this._storage.keys); // ["baz"]

    this._storage.clear();
    console.log(this._storage.has('baz')); // false
    console.log(this._storage.length); // 0
    console.log(this._storage.keys); // []
  }
}
