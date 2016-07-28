import { Component } from '@angular/core';
import { MDL_DIRECTIVES } from '../../components';
import { PrismDirective } from './../prism/prism.component';

@Component({
  moduleId: module.id,
  selector: 'list-demo',
  templateUrl: 'list.component.html',
  styles: [
`
  mdl-list {
    width: 300px;
  }
  
  mdl-radio, mdl-checkbox, mdl-switch {
    display: inline;
  }
`
  ],
  directives: [
    MDL_DIRECTIVES,
    PrismDirective
  ],
})
export class ListDemo {}
