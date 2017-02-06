import {
  inject,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {expect} from 'chai';
import {HelloWorld} from './../src/helloWorld.component';
import {SliderComponent} from './../src/components/src/controls/slider.component'
import {InjectableComponent, InjectableListComponent} from './../src/components/src/controls/injectables.component'
import {ComponentsModule} from '../src';

describe('hello-world component', () => {

  let fixture: ComponentFixture<HelloWorld>

  beforeEach(() => {
    TestBed.configureTestingModule({
      //imports: [ComponentsModule]
      declarations: [
        HelloWorld,
        SliderComponent//,
        //InjectableComponent,
        //InjectableListComponent
      ]
      /*declarations: [
        HelloWorld
      ],
      imports: [
        // HttpModule, etc.
      ],
      providers: [
        // { provide: ServiceA, useClass: TestServiceA }
      ]*/
    });
  });

  it('should say hello world', async() => {
    //const fixture: ComponentFixture<HelloWorld> = TestBed.createComponent(HelloWorld);
    //fixture.detectChanges();
    TestBed.overrideComponent(SliderComponent, {
      set: {
        //template: 'src/components/src/controls/slider.component.html',
        //styles: ['src/components/src/controls/slider.component.css']
        //
        template: '<div>Overridden template here</div>'
      }
    });

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(HelloWorld);

      // Access the element
      const element = fixture.nativeElement;

      // Detect changes as necessary
      fixture.detectChanges();

      expect(fixture.nativeElement.innerHTML.trim()).to.equal('Hello world from the Angular2 Injectable Components module!');
    });
  });
});
