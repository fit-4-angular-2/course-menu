import {
  ValidatorFn,
  AbstractControl
} from '@angular/forms';


export class CmCollectionValidators {

  /**
   * Validator that requires that at least minSelectedItemsCount is selected.
   */
  static atLeastSelectedItems(minSelectedItemsCount: number): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let selectedItems = <[]>control.value;
      return selectedItems.length >= minSelectedItemsCount ?
        null :
        {'atLeastSelectedItems': {'requiredCount': minSelectedItemsCount, 'actualCount': selectedItems.length}};
    };
  }

  /**
   * Validator that requires that at least one item is selected.
   */
  static atLeastOneItemSelected(control: AbstractControl): {[key: string]: any} {
    let selectedItems = <[]>control.value;
    return selectedItems.length >= 1 ?
      null :
    {'atLeastSelectedItems': {'requiredCount': 1, 'actualCount': selectedItems.length}};
  }
}
