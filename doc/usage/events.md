# Events
Every time one or several values are changed (added, removed or updated) through the `LocalStorage` or `SessionStorage` class, a `changes` event is triggered.

This event is exposed as an [Observable](https://angular.io/guide/observables), you can subscribe to it using the `onChange` property:

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
		this._storage.onChange.subscribe((changes: SimpleChanges) => {
			for (const [key, value] of Object.entries(changes)) console.log(`${key}: ${JSON.stringify(value)}`);
		});
	}
}
```

The changes are expressed as a [`SimpleChanges`](https://angular.io/api/core/SimpleChanges) object.
The values of this object are [`SimpleChange`](https://angular.io/api/core/SimpleChange) instances, where an `undefined` property indicates an absence of value:

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
		this._storage.onChange.subscribe((changes: SimpleChanges) => {
			for (const [key, change] of Object.entries(changes)) console.log({
				key,
				current: change.newValue,
				previous: change.oldValue
			});
		});

		this._storage.set("foo", "bar");
		// Prints: {key: "foo", current: "bar", previous: undefined}

		this._storage.set("foo", "baz");
		// Prints: {key: "foo", current: "baz", previous: "bar"}

		this._storage.remove("foo");
		// Prints: {key: "foo", current: undefined, previous: "baz"}
	}
}
```

The values contained in the `newValue` and `oldValue` properties of the `SimpleChange` instances are the raw storage values. If you use the `WebStorage.setObject()` method to store a value, you will get the serialized string value, not the original value passed to the method:

``` typescript
this._storage.setObject("foo", {bar: "baz"});
// Prints: {key: "foo", current: "{\"bar\": \"baz\"}", previous: undefined}
```

## Changes in the context of another document
The `WebStorage` parent class supports the global [storage events](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event).

When a change is made to the storage area within the context of another document (i.e. in another tab or `<iframe>`), a `changes` event is triggered to notify the modification.

!!! info
	You do not need to explicitly subscribe to the global [storage events](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event): this is automatically done when instantiating the service. The subscription is canceled when the service is destroyed (i.e. its `ngOnDestroy()` method is called).
