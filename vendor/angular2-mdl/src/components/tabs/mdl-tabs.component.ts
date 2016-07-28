import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { BooleanProperty } from './../common/boolean-property';
import { NumberProperty } from './../common/number.property';
import { MDL_COMMON_DIRECTIVES } from './../common/mdl-ripple.directive';
import { MdlTabPanelComponent } from './mdl-tab-panel.component';

@Component({
  selector: 'mdl-tabs',
  host: {
    '[class.mdl-tabs]': 'true',
    '[class.is-upgraded]': 'true'
  },
  template:
  `
   <div class="mdl-tabs__tab-bar">
      <a href="javascript:void(0)" *ngFor="let tab of tabs.toArray()"  
            (click)="tabSelected(tab)"
            class="mdl-tabs__tab" 
            [mdl-ripple]="isRipple"
            [ngClass]="{'is-active': tab.isActive}">{{tab.title}}</a>
  </div>
  <ng-content></ng-content>
  `,
  directives: [MDL_COMMON_DIRECTIVES]
})
export class MdlTabsComponent implements AfterContentInit {

  @Input('mdl-tab-active-index') @NumberProperty() public selectedIndex: number = 0;
  @Input('mdl-ripple') @BooleanProperty() protected isRipple = false;
  @Output('mdl-tab-active-changed') public selectedTabEmitter = new EventEmitter();

  @ContentChildren(MdlTabPanelComponent) protected tabs: QueryList<MdlTabPanelComponent>;


  public ngAfterContentInit() {
    if (this.tabs.toArray().length > 0 && this.selectedIndex <= this.tabs.toArray().length) {
      this.tabs.toArray()[this.selectedIndex].isActive = true;
    }
  }

  protected tabSelected(tab: MdlTabPanelComponent) {
    let index = this.tabs.toArray().indexOf(tab);
    if (index != this.selectedIndex) {
      // deselect all tabs
      this.tabs.forEach( ( aTab ) => aTab.isActive = false );
      // select the clicked tab
      tab.isActive = true;

      this.selectedIndex = index;
      this.selectedTabEmitter.emit({index: this.selectedIndex});
    }
  }
}
