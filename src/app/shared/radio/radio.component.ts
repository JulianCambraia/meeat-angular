import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { RadioOption } from './radio-option.model';

@Component({
    selector: 'mt-radio',
    templateUrl: './radio.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioComponent),
            multi: true
        }
    ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {

    @Input() options: RadioOption[];

    value: any;

    onChange: any;

    onTouched: any

    constructor() { }

    ngOnInit() {
    }

    setaValor(value: any) {
        this.value = value;
        this.onChange(this.value);
        this.onTouched();
    }

    writeValue(obj: any): void {
        this.value = obj;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;

    }
    setDisabledState?(isDisabled: boolean): void {

    }

}
