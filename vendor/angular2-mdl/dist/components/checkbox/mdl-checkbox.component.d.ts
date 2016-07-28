import { ElementRef, Renderer } from '@angular/core';
import { ControlValueAccessor } from '@angular/common';
export declare class MdlCheckboxComponent implements ControlValueAccessor {
    private elementRef;
    private renderer;
    private value_;
    private el;
    constructor(elementRef: ElementRef, renderer: Renderer);
    value: boolean;
    writeValue(value: any): void;
    private onTouchedCallback;
    private onChangeCallback;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    protected onFocus(): void;
    protected onBlur(): void;
    protected onClick(): void;
}
export declare const MDL_CHECKBOX_DIRECTIVES: typeof MdlCheckboxComponent[];
