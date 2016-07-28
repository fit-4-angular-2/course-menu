import { ElementRef, QueryList } from '@angular/core';
import { MdlLayoutTabPanelComponent } from './mdl-layout-tab-panel.component';
export declare class MdlLayoutContentComponent {
    private elRef;
    tabs: QueryList<MdlLayoutTabPanelComponent>;
    protected el: HTMLElement;
    constructor(elRef: ElementRef);
}
