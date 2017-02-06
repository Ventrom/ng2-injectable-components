import { Component, EventEmitter, Input, Injector, Output, ViewEncapsulation, ViewChild, OnInit, ElementRef } from '@angular/core';
import { Subject } from 'rxjs'
//import sliderBuilder = require('../../../slider')
import * as sliderBuilder from '../../../lib/slider'

export class SliderConfig {
    minimumValue: number
    maximumValue: number
    stepSize: number
    value: number
    cssClass: string
    units: string

    public constructor(
        fields?: {
            minimumValue?: number,
            maximumValue?: number,
            stepSize?: number,
            value?: number,
            cssClass?: string,
            units?: string
        }) {
        if (fields) Object.assign(this, fields);
    }
}

@Component({
    selector: 'slider',
    template: './slider.component.html',
    styleUrls: ['./slider.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit {
    @Input() config: SliderConfig;
    @Output() valueChange = new EventEmitter<number>();
    @ViewChild('slider') sliderDiv: ElementRef;
    private slider: any;

    constructor(
        private injector: Injector
    ) {
        let config = injector.get('config', null);
        if (config) this.config = config;
    }

    ngOnInit(): void {
        let self = this
        self.slider = sliderBuilder()
            ['configure'](self.config)
            .appendTo(self.sliderDiv.nativeElement)
            .callback(function (context: any, value: any) {
                self.update(context.value());
            });
    }

    inc():void {this.slider.increment()}
    dec():void {this.slider.decrement()}

    update(newvalue: number):void {
        this.config.value = newvalue;
        this.slider.value(newvalue);
        this.valueChange.emit(this.config.value)
    }
}