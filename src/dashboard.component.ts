import { Component, ViewEncapsulation } from '@angular/core';
import { SliderConfig, SliderComponent } from './components/src/controls/slider.component';
import { InjectableListComponent, InjectableComponent } from './components/src/controls/injectables.component';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  injectableType: any = SliderComponent;
  injectableModels: Array<any> = [];
  private sliderParams: SliderConfig = new SliderConfig({
                                      minimumValue: 5,
                                      maximumValue: 50,
                                      stepSize: 5,
                                      value: 20,
                                      units: 'hrs'});

  constructor() {}

  getSliderDefaults() {
      return {config: this.sliderParams}
  }
}
