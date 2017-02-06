import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelloWorld } from './helloWorld.component';
import { SliderComponent } from './components/src/controls/slider.component'
import { InjectableComponent, InjectableListComponent } from './components/src/controls/injectables.component'

export var Injectables = [SliderComponent];

@NgModule({
  declarations: [
      HelloWorld,
      SliderComponent//,
      //InjectableComponent,
      //InjectableListComponent
  ],
  imports: [CommonModule],
  exports: [
      HelloWorld,
      SliderComponent//,
      //InjectableComponent,
      //InjectableListComponent
  ]
})
export class ComponentsModule {}