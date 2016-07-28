import {
  Component,
  ElementRef,
  Renderer,
  ViewEncapsulation,
  QueryList,
  Inject,
  forwardRef
} from '@angular/core';
import { MdlLayoutTabPanelComponent } from './mdl-layout-tab-panel.component';
import { MdlAnchorRippleDirective } from './../common/mdl-ripple.directive';
import { MdlLayoutComponent } from './mdl-layout.component';

@Component({
  selector: 'mdl-layout-header',
  host: {
    '[class.mdl-layout__header]': 'true',
    '[class.is-casting-shadow]': 'mode==="standard" || isCompact',
    '[class.mdl-layout__header--seamed]': 'isSeamed',
    '[class.mdl-layout__header--waterfall]': 'mode==="waterfall"',
    '[class.mdl-layout__header--scroll]': 'mode==="scroll"',
    '[class.is-compact]' : 'isCompact',
    '(transitionend)': 'onTransitionEnd()',
    '(click)': 'onClick()'
  },
  template: `
     <ng-content></ng-content>
     <div *ngIf="tabs?.toArray()?.length > 0" class="mdl-layout__tab-bar-container">
         <div class="mdl-layout__tab-bar is-casting-shadow">
              <a href="javascript:void(0)" *ngFor="let tab of tabs.toArray()"  
                (click)="mdlLayout.tabSelected(tab)"
                class="mdl-layout__tab" 
                [mdl-ripple]="isRipple"
                [ngClass]="{'is-active': tab.isActive}">{{tab.title}}</a>
         </div>
     </div>
  `,
  encapsulation: ViewEncapsulation.None,
  directives: [MdlAnchorRippleDirective]
})
export class MdlLayoutHeaderComponent {

  // set from MdlLayoutComponent
  public mode: string;
  protected el: HTMLElement;
  public isCompact = false;
  public isAnimating = false;
  public isSeamed = false;
  public isRipple = true;

  // will be set from mdllayoutcomponent
  public tabs: QueryList<MdlLayoutTabPanelComponent>;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer,
    @Inject(forwardRef(() => MdlLayoutComponent)) private mdlLayout: MdlLayoutComponent) {
    this.el = elementRef.nativeElement;
  }

  protected onTransitionEnd() {
    this.isAnimating = false;
  }

  protected onClick() {
    if (this.isCompact) {
      this.isCompact = false;
      this.isAnimating = true;
    }
  }
}
