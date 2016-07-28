import { OnChanges, SimpleChange } from '@angular/core';
export declare class MdlProgressComponent implements OnChanges {
    progress: number;
    buffer: number;
    aux: number;
    indeterminate: boolean;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    private setBuffer(b);
}
export declare const MDL_PROGRESS_DIRECTIVES: typeof MdlProgressComponent[];
