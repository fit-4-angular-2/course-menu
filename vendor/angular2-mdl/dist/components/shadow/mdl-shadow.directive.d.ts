import { OnChanges, SimpleChange, ElementRef, Renderer } from '@angular/core';
import { MdlError } from './../common/mdl-error';
export declare class MdlUnsupportedShadowValueError extends MdlError {
    constructor(value: number | string);
}
export declare class MdlShadowDirective implements OnChanges {
    private elementRef;
    private renderer;
    private el;
    mdlShadow: number;
    constructor(elementRef: ElementRef, renderer: Renderer);
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
export declare const MDL_SHADOW_DIRECTIVES: typeof MdlShadowDirective[];
