import { ElementRef, OnChanges, SimpleChange, Renderer, OnInit } from '@angular/core';
export declare class MdlRippleDirective implements OnChanges {
    private elementRef;
    protected renderer: Renderer;
    private cssContainerClasses;
    private RIPPLE;
    private rippleContainer;
    protected el: HTMLElement;
    private ripple;
    protected rippleActive: boolean | string;
    constructor(elementRef: ElementRef, renderer: Renderer, cssContainerClasses: [string]);
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
}
export declare class MdlButtonRippleDirective extends MdlRippleDirective {
    protected rippleActive: boolean | string;
    constructor(elementRef: ElementRef, renderer: Renderer);
}
export declare class MdlCheckboxRippleDirective extends MdlRippleDirective {
    protected rippleActive: boolean | string;
    constructor(elementRef: ElementRef, renderer: Renderer);
}
export declare class MdlRadioRippleDirective extends MdlRippleDirective {
    protected rippleActive: boolean | string;
    constructor(elementRef: ElementRef, renderer: Renderer);
}
export declare class MdlIconToggleRippleDirective extends MdlRippleDirective {
    protected rippleActive: boolean | string;
    constructor(elementRef: ElementRef, renderer: Renderer);
}
export declare class MdlSwitchRippleDirective extends MdlRippleDirective {
    protected rippleActive: boolean | string;
    constructor(elementRef: ElementRef, renderer: Renderer);
}
export declare class MdlMenuItemRippleDirective extends MdlRippleDirective {
    protected rippleActive: boolean | string;
    constructor(elementRef: ElementRef, renderer: Renderer);
}
export declare class MdlAnchorRippleDirective extends MdlRippleDirective {
    protected rippleActive: boolean | string;
    constructor(elementRef: ElementRef, renderer: Renderer);
}
export declare class MdlListItemRippleDirective extends MdlRippleDirective implements OnInit {
    protected rippleActive: boolean | string;
    constructor(elementRef: ElementRef, renderer: Renderer);
    ngOnInit(): void;
}
export declare const MDL_COMMON_DIRECTIVES: (typeof MdlCheckboxRippleDirective | typeof MdlButtonRippleDirective | typeof MdlRadioRippleDirective | typeof MdlIconToggleRippleDirective | typeof MdlSwitchRippleDirective | typeof MdlMenuItemRippleDirective | typeof MdlAnchorRippleDirective | typeof MdlListItemRippleDirective)[];
