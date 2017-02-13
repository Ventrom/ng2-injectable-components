import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { SliderComponent } from './components/src/controls/slider.component';
import { InjectableComponent, InjectableListComponent } from './components/src/controls/injectables.component';

export var Injectables = [SliderComponent];

@NgModule({
  declarations: [
      DashboardComponent,
      SliderComponent,
      InjectableComponent,
      InjectableListComponent
  ],
  imports: [CommonModule],
  exports: [
      DashboardComponent,
      SliderComponent,
      InjectableComponent,
      InjectableListComponent
  ],
  entryComponents: [Injectables]
})
export class InjectablesModule {}