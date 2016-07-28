import { EventEmitter } from '@angular/core';
import { IMdlTableModel, IMdlTableModelItem } from './mdl-table';
export declare class MdlTableComponent {
    model: IMdlTableModel;
    protected selectable: boolean;
}
export declare class MdlSelectableTableComponent extends MdlTableComponent {
    model: IMdlTableModel;
    selected: Array<IMdlTableModelItem>;
    selectionChange: EventEmitter<{}>;
    protected selectable: boolean;
    protected allSelected: boolean;
    isAllSelected(): boolean;
    protected toogleAll(): void;
    private updateSelected();
    protected selectionChanged(data: any): void;
}
