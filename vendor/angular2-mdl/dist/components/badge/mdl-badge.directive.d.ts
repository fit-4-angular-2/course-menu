import { OnChanges, SimpleChange, ElementRef, Renderer } from '@angular/core';
export declare class MdlBadgeDirective implements OnChanges {
    private elementRef;
    private renderer;
    private el;
    private mdlBadgeContent;
    constructor(elementRef: ElementRef, renderer: Renderer);
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): void;
}
export declare class MdlBadgeOverlapDirective {
}
export declare class MdlBadgeNoBackgroundDirective {
}
export declare const MDL_BADGE_DIRECTIVES: (typeof MdlBadgeDirective | typeof MdlBadgeOverlapDirective)[];
