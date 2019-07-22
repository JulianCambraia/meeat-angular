import { AfterContentInit, Component, ContentChild, Input, OnInit } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';

@Component({
    selector: 'mt-input-container',
    templateUrl: './input-container.component.html'
})
export class InputContainerComponent implements OnInit, AfterContentInit {

    @Input() label: string;

    @Input() errorMessage: string;

    inputGenerico: any;

    @ContentChild(NgModel) model: NgModel;

    @ContentChild(FormControlName) control: FormControlName;

    constructor() { }

    ngOnInit() {
    }

    ngAfterContentInit(): void {
        this.inputGenerico = this.model || this.control;
        if (this.inputGenerico === undefined) {
            throw new Error("Esse component precisa ser usado com a propriedade NgModel ou FormControlName.");
        }
    }

    hasSuccess(): boolean {
        return this.inputGenerico.valid && (this.inputGenerico.dirty || this.inputGenerico.touched);
    }

    hasError(): boolean {
        return this.inputGenerico.invalid && (this.inputGenerico.dirty || this.inputGenerico.touched);
    }
}
