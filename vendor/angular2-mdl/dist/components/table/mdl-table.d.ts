export interface IMdlTableColumn {
    key: string;
    name: string;
    sortable?: boolean;
    numeric?: boolean;
}
export interface IMdlTableModelItem {
    selected: boolean;
}
export interface IMdlTableModel {
    columns: [IMdlTableColumn];
    data: Array<IMdlTableModelItem>;
}
export declare class MdlDefaultTableModel implements IMdlTableModel {
    columns: [IMdlTableColumn];
    data: Array<IMdlTableModelItem>;
    constructor(columns: [IMdlTableColumn]);
    addAll(data: [IMdlTableModelItem]): void;
}
