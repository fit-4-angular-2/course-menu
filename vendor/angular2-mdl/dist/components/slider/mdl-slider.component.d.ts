import { Renderer, ElementRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/common';
export declare class MdlSliderComponent implements ControlValueAccessor {
    private renderer;
    private elRef;
    private value_;
    min: number;
    max: number;
    private lowerEl;
    private upperEl;
    private inputEl;
    constructor(renderer: Renderer, elRef: ElementRef);
    value: any;
    writeValue(value: number): void;
    private onTouchedCallback;
    private onChangeCallback;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    private updateSliderUI();
    onMouseUp(event: any): void;
    onMouseDown(event: MouseEvent): void;
}
export declare const MDL_SLIDER_DIRECTIVES: typeof MdlSliderComponent[];
