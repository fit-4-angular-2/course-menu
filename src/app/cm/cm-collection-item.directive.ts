import {
  Directive,
  OnInit,
  OnDestroy,
  Input,
  Optional,
  Self
} from '@angular/core';
import { CmCollectionComponent } from './cm-collection.component';
import {NgModel} from '@angular/forms';

@Directive({
  selector: '[cmItem][ngModel]'
})
export class CmCollectionItemDirective implements  OnInit, OnDestroy {

  @Input() cmItem: any;

  constructor(@Optional() public cmCollection: CmCollectionComponent, @Self() private ngModel: NgModel) {}

  public ngOnInit() {

    if (this.cmCollection) {
      this.cmCollection.addItem(this);
    }

    this.ngModel.control.registerOnChange((currentValue) => {

      if (this.cmCollection) {
        this.cmCollection.updateSelectedItems(this.cmItem, currentValue);
      }
    });
  }

  public ngOnDestroy() {
    if (this.cmCollection) {
      this.cmCollection.removeItem(this);
    }
  }
}
