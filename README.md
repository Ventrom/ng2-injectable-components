# Angular2 Injectable Components
[![Build Status](https://travis-ci.org/Ventrom/Ventrom/ng2-injectable-components.svg?branch=master)](https://travis-ci.org/Ventrom/Ventrom/ng2-injectable-components)
[![npm version](https://badge.fury.io/js/ng2-injectable-components.svg)](http://badge.fury.io/js/ng2-injectable-components)
[![devDependency Status](https://david-dm.org/Ventrom/Ventrom/ng2-injectable-components/dev-status.svg)](https://david-dm.org/Ventrom/Ventrom/ng2-injectable-components#info=devDependencies)
[![GitHub issues](https://img.shields.io/github/issues/Ventrom/Ventrom/ng2-injectable-components.svg)](https://github.com/Ventrom/Ventrom/ng2-injectable-components/issues)
[![GitHub stars](https://img.shields.io/github/stars/Ventrom/Ventrom/ng2-injectable-components.svg)](https://github.com/Ventrom/Ventrom/ng2-injectable-components/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/Ventrom/Ventrom/ng2-injectable-components/master/LICENSE)

## Demo
https://Ventrom.github.io/Ventrom/ng2-injectable-components/demo/

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#licence)

## About

A project to inject components into other Angular2 components

## Installation

Install through npm:
```
npm install --save ng2-injectable-components
```

Then use it in your app like so:

```typescript
import {Component} from '@angular/core';
import {HelloWorld} from 'ng2-injectable-components';

@Component({
  selector: 'demo-app',
  directives: [HelloWorld],
  template: '<hello-world></hello-world>'
})
export class DemoApp {}
```

You may also find it useful to view the [demo source](https://github.com/Ventrom/Ventrom/ng2-injectable-components/blob/master/demo/demo.ts).

### Usage without a module bundler
```
<script src="node_modules/dist/umd/ng2-injectable-components/ng2-injectable-components.js"></script>
<script>
    // everything is exported InjectableComponents namespace
</script>
```

## Documentation
All documentation is auto-generated from the source via typedoc and can be viewed here:
https://Ventrom.github.io/Ventrom/ng2-injectable-components/docs/

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install local dev dependencies: `npm install` while current directory is this repo

### Development server
Run `npm start` to start a development server on port 8000 with auto reload + tests.

### Testing
Run `npm test` to run tests once or `npm run test:watch` to continually run tests.

### Release
* Bump the version in package.json (once the module hits 1.0 this will become automatic)
```bash
npm run release
```

## License

MIT
