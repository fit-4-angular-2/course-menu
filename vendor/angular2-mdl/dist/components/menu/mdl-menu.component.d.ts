import { OnInit, AfterViewInit, Renderer } from '@angular/core';
import { MdlButtonComponent } from './../button/mdl-button.component';
import { MdlError } from './../common/mdl-error';
export declare class MdlMenuError extends MdlError {
}
export declare class MdlMenuComponent implements OnInit, AfterViewInit {
    private renderer;
    position: string;
    private containerChild;
    private container;
    private menuElementChild;
    private menuElement;
    private outlineChild;
    private outline;
    private menuItemComponents;
    private cssPosition;
    private isVisible;
    constructor(renderer: Renderer);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    toggle(event: Event, mdlButton: MdlButtonComponent): void;
    hideOnItemClicked(): void;
    hide(): void;
    show(event: any, mdlButton: any): void;
    private addAnimationEndListener();
    private applyClip(height, width);
}
