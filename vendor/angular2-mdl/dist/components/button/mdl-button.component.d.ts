import { ElementRef, OnChanges, Renderer } from '@angular/core';
import { MdlError } from './../common/mdl-error';
export declare class MdlUnsupportedButtonTypeError extends MdlError {
    constructor(type: string);
}
export declare class MdlUnsupportedColoredTypeError extends MdlError {
    constructor(type: string);
}
export declare class MdlButtonComponent implements OnChanges {
    private elementRef;
    private renderer;
    private element;
    private mdlButtonType;
    private mdlColoredType;
    disabled: boolean;
    constructor(elementRef: ElementRef, renderer: Renderer);
    ngOnChanges(): void;
    protected onMouseUp(): void;
    protected onMouseLeave(): void;
    private blurIt();
}
export declare const MDL_BUTTON_DIRECTIVES: typeof MdlButtonComponent[];
