import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderComponent } from './components/src/controls/slider.component';
import { InjectableComponent, InjectableListComponent } from './components/src/controls/injectables.component';
import { NouisliderComponent } from 'ng2-nouislider';

export var Injectables = [SliderComponent];

@NgModule({
  declarations: [
      NouisliderComponent,
      InjectableListComponent,
      InjectableComponent,
      SliderComponent
  ],
  imports: [
      CommonModule
  ],
  exports: [
      NouisliderComponent,
      InjectableListComponent,
      InjectableComponent,
      SliderComponent
  ],
  entryComponents: [Injectables]
})
export class InjectablesModule {}