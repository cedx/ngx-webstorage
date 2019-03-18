# Installation

## Requirements
Before installing **Core Library for Angular**, you need to make sure you have [Node.js](https://nodejs.org)
and [npm](https://www.npmjs.com), the Node.js package manager, up and running.

!!! warning
    Core Library for Angular requires Node.js >= **10.15.0**.

You can verify if you're already good to go with the following commands:

```shell
node --version
# v11.12.0

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
npm install @cedx/ngx-core
```

### 2. Import it
Now in your [TypeScript](https://www.typescriptlang.org) code, you can use:

```ts
import {NgxCoreModule} from '@cedx/ngx-core';
```

!!! info
    This library is packaged as [ECMAScript modules](https://nodejs.org/api/esm.html) (`.js` files).  
    To consume it, you must use a dedicated tool chain, like a build system coupled with a bundler.

### 3. Use it
See the [usage information](usage.md).
