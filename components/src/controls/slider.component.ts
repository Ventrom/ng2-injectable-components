import { Component, EventEmitter, Input, Injector, Output, ViewEncapsulation, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Subject } from 'rxjs'

export class SliderConfig {
    min: number
    max: number
    step: number
    value: number
    cssClass: string
    units: string

    public constructor(
        fields?: {
            min?: number,
            max?: number,
            step?: number,
            value?: number,
            cssClass?: string,
            units?: string
        }) {
        if (fields) Object.assign(this, fields)
    }
}

@Component({
    selector: 'slider',
    templateUrl: './slider.component.html',
    styleUrls: ['./slider.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit {
    @Input() config: SliderConfig;
    @Output() valueChange = new EventEmitter<number>()
    @ViewChild('slider') sliderDiv: ElementRef

    constructor(
        private injector: Injector
    ) {
        let config = injector.get('config', null);
        if (config) this.config = config
    }

    ngOnInit(): void {

    }

    inc():void {
        // Without parseInt this value is a string
        let currentValue: number = parseInt(this.sliderDiv['slider'].get())
        this.updateValue(currentValue + this.sliderDiv['step'])
    }

    dec():void {
        let currentValue: number = parseInt(this.sliderDiv['slider'].get())
        this.updateValue(currentValue - this.sliderDiv['step'])
    }

    updateValue(newValue: number) {
        this.sliderDiv['slider'].set(newValue)
        this.config.value = parseInt(this.sliderDiv['slider'].get())
        this.valueChange.emit(this.config.value)
    }
}