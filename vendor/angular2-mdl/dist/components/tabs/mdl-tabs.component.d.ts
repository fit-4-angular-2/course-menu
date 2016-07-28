import { QueryList, AfterContentInit, EventEmitter } from '@angular/core';
import { MdlTabPanelComponent } from './mdl-tab-panel.component';
export declare class MdlTabsComponent implements AfterContentInit {
    selectedIndex: number;
    protected isRipple: boolean;
    selectedTabEmitter: EventEmitter<{}>;
    protected tabs: QueryList<MdlTabPanelComponent>;
    ngAfterContentInit(): void;
    protected tabSelected(tab: MdlTabPanelComponent): void;
}
