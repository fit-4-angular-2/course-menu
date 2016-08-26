import { NgModule } from '@angular/core';
import {
   FormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CmCollectionComponent } from './cm-collection.component';
import { CmCollectionItemDirective } from './cm-collection-item.directive';

export { CmCollectionValidators } from './cm-collection.validator';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [CmCollectionComponent, CmCollectionItemDirective],
  declarations: [CmCollectionComponent, CmCollectionItemDirective],
})
export class CMModule {}
