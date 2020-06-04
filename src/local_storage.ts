import {Injectable} from "@angular/core";
import {WebStorage} from "./web_storage";

/** Provides access to the local storage. */
@Injectable({providedIn: "root"})
export class LocalStorage extends WebStorage {

	/** Creates a new storage service. */
	constructor() {
		super(localStorage);
	}
}
