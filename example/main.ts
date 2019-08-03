/* eslint-disable line-comment-position */
import {Component, OnInit} from '@angular/core';
// @ts-ignore
import {LocalStorage} from '@cedx/ngx-webstorage';

/** A component that demonstrates the usage of the [[LocalStorage]] service. */
@Component({
  selector: 'my-component',
  templateUrl: './my-component.html'
})
export class MyComponent implements OnInit {
  constructor(private _storage: LocalStorage) {}

  ngOnInit(): void {
    console.log(this._storage.keys); // []
    console.log(this._storage.length); // 0

    this._storage.set('foo', 'bar');
    console.log(this._storage.keys); // ["foo"]
    console.log(this._storage.length); // 1

    this._storage.getObject('bar'); // undefined

    this._storage.set('foo', 'bar');
    this._storage.setObject('foo', {bar: 'baz'});
  }
}
