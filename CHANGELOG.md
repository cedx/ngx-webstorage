# Changelog

## Version 2.0.0
- Breaking change: changed the case of the injection tokens.
- Breaking change: dropped the [CommonJS](https://nodejs.org/api/modules.html) modules in favor of [ECMAScript](http://www.ecma-international.org/ecma-262/6.0/#sec-modules) ones.
- Breaking change: ported the source code to [TypeScript](https://www.typescriptlang.org).
- Breaking change: renamed the `StorageModule` module to `NgxWebStorage`.
- Added a user guide based on [MkDocs](http://www.mkdocs.org).
- Replaced [ESDoc](https://esdoc.org) documentation generator by [TypeDoc](https://typedoc.org).
- Replaced [ESLint](https://eslint.org) static analyzer by [TSLint](https://palantir.github.io/tslint).
- Removed the dependency on [Babel](https://babeljs.io) compiler.
- Updated the build system to [Gulp](https://gulpjs.com) version 4.
- Updated the package dependencies.

## Version 1.3.0
- Changed licensing for the [MIT License](https://opensource.org/licenses/MIT).
- Updated the package dependencies.

## Version 1.2.0
- Added support for [Browserslist](http://browserl.ist) shared settings.
- Added the [`#[Symbol.toStringTag]`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) property to the `Storage` class.
- Moved the [Angular](https://angular.io) and [RxJS](http://reactivex.io/rxjs) dependencies to peer ones.
- Updated the package dependencies.

## Version 1.1.0
- Updated the package dependencies.

## Version 1.0.0
- First stable release.
- Updated the package dependencies.

## Version 0.7.0
- Errors from `Storage#getObject()` method are silently discarded.
- Updated the package dependencies.

## Version 0.6.0
- Raised the required [Node.js](https://nodejs.org) version.
- Updated the package dependencies.

## Version 0.5.1
- Fixed a code generation bug.
- Updated the package dependencies.

## Version 0.5.0
- Added support for the [Node Security Platform](https://nodesecurity.io) reports.
- Updated the package dependencies.

## Version 0.4.0
- Added the `onChanges` event stream to the `Storage` class.

## Version 0.3.0
- Renamed the package to `ngx-webstorage` due to a trademark issue. 

## Version 0.2.0
- Breaking change: removed the `LocalStorage` and `SessionStorage` classes.
- Breaking change: removed the `WINDOW` injection token.
- Breaking change: renamed the `DOMStorage` class to `Storage`.
- Breaking change: renamed the `Storage#containsKey` method to `has`.
- Added the `LocalStorage` and `SessionStorage` injection tokens.
- Updated the package dependencies.

## Version 0.1.0
- Initial release.
