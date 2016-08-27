import {
  forwardRef,
  Provider,
  Component
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';

import { CmCollectionItemDirective } from './cm-collection-item.directive';

const CM_COLLECTION_CONTROL_VALUE_ACCESSOR = new Provider(NG_VALUE_ACCESSOR, {
  useExisting: forwardRef(() => CmCollectionComponent),
  multi: true
});

@Component({
  selector: 'cm-collection',
  template: '<ng-content></ng-content>',
  providers: [ CM_COLLECTION_CONTROL_VALUE_ACCESSOR ]
})
export class CmCollectionComponent  implements ControlValueAccessor {

  private selectedValues: any[];
  private onTouchedCallback: () => void;
  private onChangeCallback: (_: any) => void;
  public cmItems = new Set();

  constructor() {}

  /**
   * Write a new value to the element.
   */
  public writeValue(obj: any) {
    this.selectedValues = obj;
    if (this.onChangeCallback ) {
      this.onChangeCallback(this.selectedValues);
    }
  }
  /**
   * Set the function to be called when the control receives a change event.
   */
  public registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }
  /**
   * Set the function to be called when the control receives a touch event.
   */
  public registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  public addItem(cmItem: CmCollectionItemDirective) {
    this.cmItems.add(cmItem);
  }

  public removeItem(cmItem: CmCollectionItemDirective) {
    this.cmItems.delete(cmItem);
  }

  public updateSelectedItems(cmItemValue, addOrRemove) {

    if (addOrRemove) {
        this.selectedValues.push(cmItemValue);
    } else {
      let idx = this.selectedValues.indexOf(cmItemValue);
      if (idx !== -1) {
        this.selectedValues.splice(idx, 1);
      }
    }

    if (this.onChangeCallback ) {
      this.onChangeCallback(this.selectedValues);
    }
  }
}
