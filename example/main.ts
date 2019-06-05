/* eslint-disable */
import {Component, OnInit} from '@angular/core';
// @ts-ignore
import {LocalStorage} from '@cedx/ngx-webstorage';

/** A component that demonstrates the usage of the {@link LocalStorage} service. */
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

    this._storage.getObject('bar');

    this._storage.set('foo', 'bar');
    this._storage.setObject('foo', {bar: 'baz'});
  }
}
