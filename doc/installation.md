# Installation

## Requirements
Before installing **Web Storage for Angular**, you need to make sure you have [Node.js](https://nodejs.org)
and [npm](https://www.npmjs.com), the Node.js package manager, up and running.

You can verify if you're already good to go with the following commands:

``` shell
node --version
# v14.5.0

npm --version
# 6.14.5
```

!!! info
	If you plan to play with the package sources, you will also need
	[PowerShell](https://docs.microsoft.com/en-us/powershell) and [Material for MkDocs](https://squidfunk.github.io/mkdocs-material).

## Installing with npm package manager

### 1. Install it
From a command prompt, run:

``` shell
npm install @cedx/ngx-webstorage
```

### 2. Import it
Now in your [TypeScript](https://www.typescriptlang.org) code, you can use:

``` typescript
import {LocalStorage, SessionStorage} from "@cedx/ngx-webstorage";
```
