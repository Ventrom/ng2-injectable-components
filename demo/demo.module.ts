import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {InjectablesModule} from '../src';
import {Demo} from './demo.component';

@NgModule({
  declarations: [Demo],
  imports: [BrowserModule, InjectablesModule],
  bootstrap: [Demo],
  providers: []
})
export class DemoModule {}
