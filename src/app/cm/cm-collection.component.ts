import {
  forwardRef,
  Provider,
  Component,
  OnInit
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';

import { CmCollectionItemDirective } from './cm-collection-item.directive';

const noop = (_?: any) => {};

@Component({
  selector: 'cm-collection',
  template: '<ng-content></ng-content>',
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CmCollectionComponent),
    multi: true
  } ]
})
export class CmCollectionComponent  implements ControlValueAccessor, OnInit {

  public selectedValues: any[];
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  public cmItems = new Set();

  constructor() {}

  public ngOnInit() {
  }
  /**
   * Write a new value to the element.
   */
  public writeValue(obj: any) {
    this.selectedValues = obj;
    this.onChangeCallback(this.selectedValues);
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

    this.onChangeCallback(this.selectedValues);
  }
}
