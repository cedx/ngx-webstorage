# Installation

## Requirements
Before installing **Web Storage for Angular**, you need to make sure you have [Node.js](https://nodejs.org)
and [npm](https://www.npmjs.com), the Node.js package manager, up and running.

!!! warning
    Web Storage for Angular requires Node.js >= **10.15.0**.

You can verify if you're already good to go with the following commands:

```shell
node --version
# v11.13.0

npm --version
# 6.7.0
```

!!! info
    If you plan to play with the package sources, you will also need
    [Gulp](https://gulpjs.com) and [Material for MkDocs](https://squidfunk.github.io/mkdocs-material).

## Installing with npm package manager

### 1. Install it
From a command prompt, run:

```shell
npm install @cedx/ngx-webstorage
```

### 2. Import it
Now in your [TypeScript](https://www.typescriptlang.org) code, you can use:

```ts
import {LocalStorage, SessionStorage} from '@cedx/ngx-webstorage';
```

!!! info
    This library is packaged as [ECMAScript modules](https://nodejs.org/api/esm.html) (`.js` files).  
    To consume it, you must use a dedicated tool chain, like a build system coupled with a bundler.

### 3. Use it
See the [usage information](usage.md).
