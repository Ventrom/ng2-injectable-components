import { Component, Input, Output, EventEmitter, OnInit, DoCheck, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver } from '@angular/core'

@Component({
  selector: 'inj-list',
  templateUrl: './inj-list.component.html',
  styleUrls: ['./inj-list.component.scss'],
})
export class InjectableListComponent implements OnInit, DoCheck {
    @Input() component: any
    @Input() defaults: any
    @Input() models: Array<any>
    @Output() onUpdate = new EventEmitter<Array<any>>();
    serializedModels: string
    componentData: Array<any>

    constructor() {}

    ngOnInit(): void {
        this.serializedModels = JSON.stringify(this.models)
        this.componentData = this.models.map((m) => {return {component: this.component, inputs: m}})
    }
    ngDoCheck() {
        let curModels = JSON.stringify(this.models)
        if (curModels !== this.serializedModels) {
            this.onUpdate.emit(this.models)
            this.serializedModels = curModels
        }
    }
    addRow(): void {
        let model = JSON.parse(JSON.stringify(this.defaults))
        this.models.push(model)
        this.componentData.push({component: this.component, inputs: model})
    }
    delRow(index: number): void {
        this.componentData.splice(index, 1)
        this.models.splice(index, 1)
    }
}

@Component({
    selector: 'inject-component',
    template: `<div #container></div>`,
})
export class InjectableComponent {
    currentComponent = null

    @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef

    // component: Class for the component you want to create
    // inputs: An object with key/value pairs mapped to input name/input value
    @Input() set componentData(data: {component: any, inputs: any }) {
        if (!data) {
            return
        }

        // Inputs need to be in the following format to be resolved properly
        let inputProviders = Object.keys(data.inputs).map((inputName) => { return {provide: inputName, useValue: data.inputs[inputName]} })
        let resolvedInputs = ReflectiveInjector.resolve(inputProviders)

        // We create an injector out of the data we want to pass down and this components injector
        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.container.parentInjector)

        // We create a factory out of the component we want to create
        let factory = this.resolver.resolveComponentFactory(data.component)

        // We can destroy the old component
        if (this.currentComponent) {
            this.container.clear()
            this.currentComponent.destroy()
        }

        this.currentComponent = this.container.createComponent(factory, 0, injector)
    }

    constructor(private resolver: ComponentFactoryResolver) {

    }
}
