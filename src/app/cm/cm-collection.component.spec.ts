import {
  TestBed,
  async
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CMModule } from './index';
import { CmCollectionComponent } from './cm-collection.component';
import { CmCollectionItemDirective } from './cm-collection-item.directive';

const item = {selected: false};


describe('Component: CmCollection', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CMModule, FormsModule ],
      declarations: [ TestComponent ],
    });
  }));

  it('should create the cmCollection component and one collection item directive', async(( ) => {

    let fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    fixture.whenStable().then( () => {

      let debElem = fixture.debugElement.query(By.directive(CmCollectionComponent));
      expect(debElem).toBeDefined('CmCollectionComponent not found');

      let cmCollectionComponent = debElem.componentInstance;
      expect(cmCollectionComponent.cmItems.size).toBe(1, 'missing the collection item diretive instance');

      let debElems = fixture.debugElement.queryAll(By.directive(CmCollectionItemDirective));
      expect(debElems.length).toBe(1, `there is no or there are too much collection item`);

      // the component instance is null - why?
      // console.log(debElems[0]);
      // let cmCollectionItem = debElems[0].componentInstance;
      // console.log(cmCollectionItem);

    });
  }));

  it('should remove the collection item from the collection if the component is destroyed', async(() => {
    let fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    fixture.whenStable().then( () => {

      let collectionInstance = fixture.debugElement.query(By.directive(CmCollectionComponent)).componentInstance;

      expect(collectionInstance.cmItems.size).toBe(1, 'there shoudl be one item');

      fixture.componentInstance.items = [];
      fixture.detectChanges();

      expect(collectionInstance.cmItems.size).toBe(0, 'the item should have been removed');

    });

  }));

  it('should add the item to the selected items if the checkbox is clicked', async(() => {
    let fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    fixture.whenStable().then( () => {

      let debElem = fixture.debugElement.query(By.css('input'));

      // unfortunatly this dosn't propagate the changes up to the collectionComponente
      debElem.nativeElement.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.selectedItems.length).toBe(1, 'the item was not selected');

      debElem.nativeElement.click();

      expect(fixture.componentInstance.selectedItems.length).toBe(0, 'the item was not removed from the selection');

    });

  }));


});


@Component({
  selector: 'test-component',
  template: `
    <cm-collection [(ngModel)]="selectedItems">
      <div *ngFor="let item of items" >
        <input [(ngModel)]="item.selected" type="checkbox" [cmItem]="item">
      </div>
    </cm-collection>
  `
})
class TestComponent {

  public items = [
    item
  ];

  public selectedItems = [];

}
