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

To use the services module, first import it in your app:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InjectablesModule } from 'ng2-injectable-components';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        InjectablesModule
    ],
    declarations: [],
    bootstrap:    [ AppComponent ]
})
export class AppModule {}
```

Then you can use the injectable components inside a component, for example in the template:

```html
<inj-list [component]="injectableType" [defaults]="getSliderDefaults()" [(models)]="injectableModels"></inj-list>

```

and in the component:

```typescript
import { Component } from '@angular/core';
import { SliderConfig, SliderComponent } from 'ng2-injectable-components';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    injectableType: any = SliderComponent;
    injectableModels: Array<any> = [];
    private sliderParams: SliderConfig = new SliderConfig({
                                      min: 5,
                                      max: 50,
                                      step: 5,
                                      value: 20,
                                      units: 'hrs'});

    getSliderDefaults() {
        return {config: this.sliderParams}
    }
}
```

## Documentation
All documentation is auto-generated from the source via typedoc and can be viewed here:
https://Ventrom.github.io/Ventrom/ng2-message-service/docs/

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install local dev dependencies: `npm install` while current directory is this repo

## License

MIT
