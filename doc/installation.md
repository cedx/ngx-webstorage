# Installation

## Requirements
Before installing **Web Storage for Angular**, you need to make sure you have [Node.js](https://nodejs.org)
and [npm](https://www.npmjs.com), the Node.js package manager, up and running.

!!! warning
    Web Storage for Angular requires Node.js >= **12.13.0**.

You can verify if you're already good to go with the following commands:

```shell
node --version
# v13.2.0

npm --version
# 6.13.1
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

```typescript
import {LocalStorage, SessionStorage} from '@cedx/ngx-webstorage';
```

### 3. Use it
See the [usage information](usage/api.md).
