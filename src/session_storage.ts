import {Injectable} from "@angular/core";
import {WebStorage} from "./web_storage";

/** Provides access to the session storage. */
@Injectable({providedIn: "root"})
export class SessionStorage extends WebStorage {

	/** Creates a new storage service. */
	constructor() {
		super(sessionStorage);
	}
}
