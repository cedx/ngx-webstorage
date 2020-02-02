# Changelog

## Version [3.7.0](https://github.com/cedx/ngx-webstorage.js/compare/v3.6.0...v3.7.0)
- Added the `putIfAbsent()` and `putObjectIfAbsent()` methods to the `WebStorage` class.
- Updated the package dependencies.

## Version [3.6.0](https://github.com/cedx/ngx-webstorage.js/compare/v3.5.0...v3.6.0)
- Updated the package dependencies.

## Version [3.5.0](https://github.com/cedx/ngx-webstorage.js/compare/v3.4.0...v3.5.0)
- Dropped support for [Angular Universal](https://angular.io/guide/universal).
- Updated the package dependencies.

## Version [3.4.0](https://github.com/cedx/ngx-webstorage.js/compare/v3.3.0...v3.4.0)
- Added support for the [storage events](https://developer.mozilla.org/en-US/docs/Web/API/Window/storage_event).

## Version [3.3.0](https://github.com/cedx/ngx-webstorage.js/compare/v3.2.0...v3.3.0)
- Added support for [Angular Universal](https://angular.io/guide/universal).
- Updated the package dependencies.

## Version [3.2.0](https://github.com/cedx/ngx-webstorage.js/compare/v3.1.0...v3.2.0)
- APIs that use `null` references to indicate an absence of value now use `undefined`.
- Raised the [Angular](https://angular.io) constraint.
- Raised the [Node.js](https://nodejs.org) constraint.
- Updated the package dependencies.

## Version [3.1.0](https://github.com/cedx/ngx-webstorage.js/compare/v3.0.0...v3.1.0)
- Raised the [Angular](https://angular.io) constraint.
- Raised the [Node.js](https://nodejs.org) constraint.
- Updated the package dependencies.

## Version [3.0.0](https://github.com/cedx/ngx-webstorage.js/compare/v2.0.0...v3.0.0)
- Breaking change: upgraded [Angular](https://angular.io) to version 8.
- Added an example code.
- Replaced the [TSLint](https://palantir.github.io/tslint) static analyzer by [TypeScript ESLint](https://typescript-eslint.io).
- Replaced the [TypeDoc](https://typedoc.org) documentation generator by [Compodoc](https://compodoc.app).
- Updated the package dependencies.

## Version [2.0.0](https://github.com/cedx/ngx-webstorage.js/compare/v1.3.0...v2.0.0)
- Breaking change: dropped the [CommonJS modules](https://nodejs.org/api/modules.html) in favor of [ECMAScript](https://nodejs.org/api/esm.html) ones.
- Breaking change: ported the source code to [TypeScript](https://www.typescriptlang.org).
- Breaking change: raised the required [Node.js](https://nodejs.org) version.
- Breaking change: removed the `StorageModule` module.
- Breaking change: replaced the injection tokens by dedicated classes.
- Added a user guide based on [MkDocs](http://www.mkdocs.org).
- Replaced the [ESDoc](https://esdoc.org) documentation generator by [TypeDoc](https://typedoc.org).
- Replaced the [ESLint](https://eslint.org) static analyzer by [TSLint](https://palantir.github.io/tslint).
- Removed the dependency on [Babel](https://babeljs.io) compiler.
- Updated the build system to [Gulp](https://gulpjs.com) version 4.
- Updated the package dependencies.

## Version [1.3.0](https://github.com/cedx/ngx-webstorage.js/compare/v1.2.0...v1.3.0)
- Changed licensing for the [MIT License](https://opensource.org/licenses/MIT).
- Updated the package dependencies.

## Version [1.2.0](https://github.com/cedx/ngx-webstorage.js/compare/v1.1.0...v1.2.0)
- Added support for [Browserslist](http://browserl.ist) shared settings.
- Added the [`#[Symbol.toStringTag]`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) property to the `Storage` class.
- Moved the [Angular](https://angular.io) and [RxJS](http://reactivex.io/rxjs) dependencies to peer ones.
- Updated the package dependencies.

## Version [1.1.0](https://github.com/cedx/ngx-webstorage.js/compare/v1.0.0...v1.1.0)
- Updated the package dependencies.

## Version [1.0.0](https://github.com/cedx/ngx-webstorage.js/compare/v0.7.0...v1.0.0)
- First stable release.
- Updated the package dependencies.

## Version [0.7.0](https://github.com/cedx/ngx-webstorage.js/compare/v0.6.0...v0.7.0)
- Errors from `Storage#getObject()` method are silently discarded.
- Updated the package dependencies.

## Version [0.6.0](https://github.com/cedx/ngx-webstorage.js/compare/v0.5.1...v0.6.0)
- Breaking change: raised the required [Node.js](https://nodejs.org) version.
- Updated the package dependencies.

## Version [0.5.1](https://github.com/cedx/ngx-webstorage.js/compare/v0.5.0...v0.5.1)
- Fixed a code generation bug.
- Updated the package dependencies.

## Version [0.5.0](https://github.com/cedx/ngx-webstorage.js/compare/v0.4.0...v0.5.0)
- Added support for the [Node Security Platform](https://nodesecurity.io) reports.
- Updated the package dependencies.

## Version [0.4.0](https://github.com/cedx/ngx-webstorage.js/compare/v0.3.0...v0.4.0)
- Added the `onChanges` event stream to the `Storage` class.

## Version [0.3.0](https://github.com/cedx/ngx-webstorage.js/compare/v0.2.0...v0.3.0)
- Renamed the package to `ngx-webstorage` due to a trademark issue. 

## Version [0.2.0](https://github.com/cedx/ngx-webstorage.js/compare/v0.1.0...v0.2.0)
- Breaking change: removed the `LocalStorage` and `SessionStorage` classes.
- Breaking change: removed the `WINDOW` injection token.
- Breaking change: renamed the `DOMStorage` class to `Storage`.
- Breaking change: renamed the `Storage#containsKey` method to `has`.
- Added the `LocalStorage` and `SessionStorage` injection tokens.
- Updated the package dependencies.

## Version 0.1.0
- Initial release.
