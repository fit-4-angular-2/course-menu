import {
  describe,
  expect,
  it,
  inject,
  beforeEach
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component} from '@angular/core';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { MdlSelectableTableComponent } from './mdl-table.component';
import {
  IMdlTableModelItem,
  MdlDefaultTableModel
} from './mdl-table';
import {
  MdlCheckboxComponent
} from './../checkbox/mdl-checkbox.component';

describe('Component: MdlTableComponent', () => {

  var builder: TestComponentBuilder;


  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should create a table with class "mdl-data-table', () => {

    return builder
      .createAsync(MdlTestTableComponent).then((fixture) => {

        fixture.detectChanges();

        let tableEl: HTMLInputElement = fixture.debugElement.query(By.css('table')).nativeElement;
        expect(tableEl.classList.contains('mdl-data-table')).toBe(true);

      });
  });


  it('should select all items if the toggleAll checkbox is clicked', () => {
    return builder
      .createAsync(MdlTestTableComponent).then((fixture) => {

        fixture.detectChanges();

        let firstCheckboxEl: HTMLInputElement = fixture.debugElement
            .query(By.directive(MdlCheckboxComponent)).nativeElement;
        firstCheckboxEl.click();

        fixture.detectChanges();

        expect(fixture.componentInstance.selected.length).toBe(fixture.componentInstance.tableData.length);

      });
  });

  it('should change the selection to the last table row if the last checkbox is clickt', () => {
    return builder
      .createAsync(MdlTestTableComponent).then((fixture) => {

        fixture.detectChanges();

        let checkboxes = fixture.debugElement.queryAll(By.directive(MdlCheckboxComponent));
        let firstCheckboxEl: HTMLInputElement = checkboxes[checkboxes.length - 1].nativeElement;
        firstCheckboxEl.click();

        fixture.detectChanges();

        // one is already selected so we have to selected items
        expect(fixture.componentInstance.selected.length).toBe(2);

      });
  });

});


interface ITableItem extends IMdlTableModelItem {
  material: string;
  quantity: number;
  unitPrice: number;
}


@Component({
  selector: 'test-icon',
  template: `
    <mdl-table-selectable mdl-shadow="2"
         [table-model]="tableModel"
         [table-model-selected]="selected"
         (table-model-selectionChanged)="selectionChanged($event)">
    </mdl-table-selectable>
    `,
  directives: [MdlSelectableTableComponent]
})
class MdlTestTableComponent {
  private tableData: [ITableItem] = [
    {material: 'Acrylic (Transparent)', quantity: 25, unitPrice: 2.90, selected: true},
    {material: 'Plywood (Birch)', quantity: 50, unitPrice: 1.25, selected: false},
    {material: 'Laminate (Gold on Blue)', quantity: 10, unitPrice: 2.35, selected: false}
  ];

  protected selected: Array<ITableItem> = new Array<ITableItem>();

  public tableModel = new MdlDefaultTableModel([
    {key: 'material', name: 'Material', sortable: true},
    {key: 'quantity', name: 'Quantity', sortable: true, numeric: true},
    {key: 'unitPrice', name: 'Unit price', numeric: true}
  ]);

  public ngOnInit() {
    this.tableModel.addAll(this.tableData);
    this.selected = this.tableData.filter( data => data.selected);
  }

  public selectionChanged($event) {
    this.selected = $event.value;
  }
}
