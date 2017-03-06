import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InjectableComponent, InjectableListComponent } from './src/injectables.component';

@NgModule({
  declarations: [
      InjectableListComponent,
      InjectableComponent
 ],
  imports: [
      CommonModule
  ],
  exports: [
      InjectableListComponent,
      InjectableComponent
  ]
})
export class InjectablesModule {}