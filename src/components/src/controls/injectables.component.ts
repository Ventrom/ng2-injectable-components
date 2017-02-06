import { Component, Input, OnInit, SimpleChanges, DoCheck, KeyValueDiffers, ViewContainerRef, ViewChild,
         ReflectiveInjector, ComponentFactoryResolver, KeyValueChangeRecord, ComponentRef, ChangeDetectorRef, KeyValueDiffer } from '@angular/core'
import { Injectables } from '../../../components.module'

@Component({
  selector: 'inj-list',
  templateUrl: './inj-list.component.html',
  styleUrls: ['../../../../semanticui/dist/semantic.min.css', './inj-list.component.css'],
})
export class InjectableListComponent implements OnInit, DoCheck {
    @Input() component: any
    @Input() defaults: any
    @Input() models: Array<any>
    differ: KeyValueDiffer
    objDiffer: any[] = []

    constructor(
        private differs: KeyValueDiffers
    ) {
        this.differ = this.differs.find([]).create(null)
    }

    ngOnInit(): void {
        this.models.forEach((elt) => {
            this.objDiffer.push(this.differs.find({}).create(null))
        });
    }
    ngDoCheck() {
        let tmpInputs: any[] = []
        this.models.forEach((m) => { tmpInputs.push(m.inputs.config) })
        var changes = this.differ.diff(this.models)

        if (changes) {
            console.log('changes detected')
            changes.forEachChangedItem((r: KeyValueChangeRecord) => {
                console.log('Changed ')
                console.log(r.currentValue.inputs)
            })
            changes.forEachAddedItem((r: KeyValueChangeRecord) => {
                console.log('Added ')
                console.log(r.currentValue.inputs)
            })
            changes.forEachRemovedItem((r: KeyValueChangeRecord) => {
                console.log('Removed ')
                console.log(r.currentValue.inputs)
            })
        } else {
            console.log('Nothing changed')
        }

        tmpInputs.forEach((elt, i) => {
            var objChanges = this.objDiffer[i].diff(elt)
            if (objChanges) {
                objChanges.forEachChangedItem((elt: KeyValueChangeRecord) => {
                    console.log("A value change occurred!")
                    console.log(elt)
                })
            }
        })
    }
    addRow(): void {
        this.models.push({component: this.component, inputs: JSON.parse(JSON.stringify(this.defaults))})
        this.objDiffer.push(this.differs.find({}).create(null))
    }
    delRow(index: number): void {
        this.models.splice(index, 1)
        this.objDiffer.pop()
    }
}

@Component({
    selector: 'inject-component',
    entryComponents: Injectables, // Reference to the components must be here in order to dynamically create them
    template: `
      <div #container></div>
    `,
})
export class InjectableComponent {
    currentComponent: ComponentRef<any> = null

    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef

    // component: Class for the component you want to create
    // inputs: An object with key/value pairs mapped to input name/input value
    @Input() set componentData(data: {component: any, inputs: any }) {
        if (!data) {
            return
        }

        // Inputs need to be in the following format to be resolved properly
        let inputProviders = Object.keys(data.inputs).map((inputName) => { return {provide: inputName, useValue: data.inputs[inputName]} })
        let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

        // We create an injector out of the data we want to pass down and this components injector
        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.container.parentInjector)

        // We create a factory out of the component we want to create
        let factory = this.resolver.resolveComponentFactory(data.component)

        // We create the component using the factory and the injector
        let component = factory.create(injector)

        // We insert the component into the dom container
        this.container.insert(component.hostView)

        // We can destroy the old component is we like by calling destroy
        if (this.currentComponent) {
            this.currentComponent.destroy()
        }

        this.currentComponent = component
    }

    constructor(private resolver: ComponentFactoryResolver) {

    }
}