# Events
Every time one or several values are changed (added, removed or updated) through the `LocalStorage` or `SessionStorage` class,
a [`StorageEvent`](https://developer.mozilla.org/en-US/docs/Web/API/StorageEvent) of type `change` is emitted

These events are exposed as an [Observable](https://angular.io/guide/observables), you can subscribe to it using the `onChange` property:

``` typescript
import {Component, OnInit, SimpleChanges} from "@angular/core";
import {LocalStorage} from "@cedx/ngx-webstorage";

@Component({
	selector: "my-component",
	templateUrl: "./my-component.html"
})
export class MyComponent implements OnInit {
	constructor(private _storage: LocalStorage) {}
	
	ngOnInit(): void {
		this._storage.onChange.subscribe(event => {
			console.log(`${event.key}: ${event.oldValue} => ${event.newValue}`);
		});

		this._storage.set("foo", "bar"); // "foo: null => bar"
		this._storage.set("foo", "baz"); // "foo: bar => baz"
		this._storage.remove("foo"); // "foo: baz => null"
	}
}
```

The values contained in the `newValue` and `oldValue` properties of the [`StorageEvent`](https://developer.mozilla.org/en-US/docs/Web/API/StorageEvent) instances are the raw storage values.
If you use the `WebStorage.setObject()` method to store a value, you will get the serialized string value, not the original value passed to the method:

``` typescript
this._storage.setObject("foo", {bar: "baz"});
// "foo: null => {\"bar\": \"baz\"}"
```

## Changes in the context of another document
The `LocalStorage` and `SessionStorage` classes support the global [storage events](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event).

Everytime a change is made to the storage area within the context of another document (i.e. in another tab or `<iframe>`), a `change` event is emitted to notify the modification.

!!! info
	You do not need to explicitly subscribe to the global [storage events](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event): this is automatically done when instantiating the service. The subscription is canceled when the service is destroyed (i.e. its `ngOnDestroy()` method is called).
