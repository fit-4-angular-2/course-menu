import { ElementRef, Renderer } from '@angular/core';
import { ControlValueAccessor } from '@angular/common';
export declare class MdlRadioComponent implements ControlValueAccessor {
    private elementRef;
    private renderer;
    name: string;
    value: any;
    optionValue: any;
    private el;
    constructor(elementRef: ElementRef, renderer: Renderer);
    writeValue(optionValue: any): void;
    private onTouchedCallback;
    private onChangeCallback;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    protected onFocus(): void;
    protected onBlur(): void;
    protected onClick(): void;
}
export declare const MDL_RADIO_DIRECTIVES: typeof MdlRadioComponent[];
