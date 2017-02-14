/// <reference types="jasmine" />

import {
  inject,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {expect} from 'chai';
import {DashboardComponent} from '../src/dashboard.component';
import {SliderComponent} from '../src/components/src/controls/slider.component'
import {InjectableComponent, InjectableListComponent} from '../src/components/src/controls/injectables.component'
import {InjectablesModule} from '../src';

describe('Dashboard Component', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        SliderComponent,
        InjectableComponent,
        InjectableListComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should have a defined component', () => {
    expect(component).to.exist;
  });
});

