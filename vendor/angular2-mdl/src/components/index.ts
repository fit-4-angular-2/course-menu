import {
  MdlButtonRippleDirective,
  MdlCheckboxRippleDirective,
  MdlRadioRippleDirective,
  MdlIconToggleRippleDirective,
  MdlSwitchRippleDirective,
  MdlMenuItemRippleDirective,
  MdlListItemRippleDirective,
  MdlAnchorRippleDirective
} from './common/mdl-ripple.directive';
import { MdlButtonComponent } from './button/mdl-button.component';
import {
  MdlBadgeDirective,
  MdlBadgeNoBackgroundDirective,
  MdlBadgeOverlapDirective
} from './badge/mdl-badge.directive';
import { MdlShadowDirective } from './shadow/mdl-shadow.directive';
import {
  MdlCardComponent,
  MdlCardTitleComponent,
  MdlCardMediaComponent,
  MdlCardSupportingTextComponent,
  MdlCardActionsComponent,
  MdlCardMenuComponent,
  MdlCardTitleTextDirective,
  MdlCardBorderDirective,
  MdlCardExpandDirective
} from './card/mdl-card.component';
import { MdlCheckboxComponent } from './checkbox/mdl-checkbox.component';
import { MdlRadioComponent } from './radio/mdl-radio.component';
import {
  MdlProgressComponent
} from './progress/mdl-progress.component';
import { MdlIconComponent } from './icon/mdl-icon.component';
import { MdlIconToggleComponent } from './icon-toggle/mdl-icon-toggle.component';
import {
  MdlListComponent,
  MdlListItemComponent,
  MdlListItemPrimaryContentComponent,
  MdlListItemIconDirective,
  MdlListItemAvatarDirective,
  MdlListItemSecondaryContentComponent,
  MdlListItemSecondaryActionComponent,
  MdlListItemSubTitleComponent,
  MdlListItemSecondaryInfoComponent,
  MdlListItemTextBodyComponent
} from './list/mdl-list.component';
import { MdlSpinnerComponent } from './spinner/mdl-spinner.component';
import { MdlSliderComponent }  from './slider/mdl-slider.component';
import { MdlSwitchComponent } from './switch/mdl-switch.component';
import {
  MdlSnackbarService
} from './snackbar/mdl-snackbar.service';
import {
  MdlTooltipComponent,
  MdlTooltipDirective,
  MdlTooltipLargeDirective
} from './tooltip/index';
import {
  MdlTableComponent,
  MdlSelectableTableComponent
} from './table/index';
import {
  MdlMenuComponent,
  MdlMenuItemComponent,
  MdlMenuItemFullBleedDeviderComponent
} from './menu/index';
import {
  MdlLayoutComponent,
  MdlLayoutHeaderComponent,
  MdlLayoutDrawerComponent,
  MdlLayoutContentComponent,
  MdlLayoutHeaderTransparentDirective,
  MdlLayoutHeaderRowComponent,
  MdlLayoutTitleComponent,
  MdlLayoutSpacerComponent,
  MdlLayoutTabPanelComponent
} from './layout/index';
import {
  MdlTabsComponent,
  MdlTabPanelComponent
} from './tabs/index';
import {
  MdlTextFieldComponent
} from './textfield/mdl-textfield.component';

export * from './common/mdl-ripple.directive';
export * from './badge/mdl-badge.directive';
export * from './button/mdl-button.component';
export * from './card/mdl-card.component';
export * from './checkbox/mdl-checkbox.component';
export * from './icon/mdl-icon.component';
export * from './list/mdl-list.component';
export * from './icon-toggle/mdl-icon-toggle.component';
export * from './progress/mdl-progress.component';
export * from './radio/mdl-radio.component';
export * from './shadow/mdl-shadow.directive';
export * from './spinner/mdl-spinner.component';
export * from './slider/mdl-slider.component';
export * from './snackbar/mdl-snackbar.service';
export * from './switch/mdl-switch.component';
export * from './table/index'
export * from './tooltip/index';
export * from './menu/index';
export * from './layout/index';
export * from './tabs/index';
export * from './textfield/mdl-textfield.component';

export const MDL_SERVICES = [
  MdlSnackbarService
];

export const MDL_DIRECTIVES = [
  MdlButtonRippleDirective,
  MdlCheckboxRippleDirective,
  MdlRadioRippleDirective,
  MdlIconToggleRippleDirective,
  MdlSwitchRippleDirective,
  MdlListItemRippleDirective,
  MdlAnchorRippleDirective,
  MdlBadgeDirective,
  MdlBadgeNoBackgroundDirective,
  MdlBadgeOverlapDirective,
  MdlButtonComponent,
  MdlCardComponent,
  MdlCardTitleComponent,
  MdlCardSupportingTextComponent,
  MdlCardActionsComponent,
  MdlCardMenuComponent,
  MdlCardTitleTextDirective,
  MdlCardMediaComponent,
  MdlCardBorderDirective,
  MdlCardExpandDirective,
  MdlCheckboxComponent,
  MdlIconComponent,
  MdlIconToggleComponent,
  MdlListComponent,
  MdlListItemComponent,
  MdlListItemPrimaryContentComponent,
  MdlListItemIconDirective,
  MdlListItemAvatarDirective,
  MdlListItemSecondaryContentComponent,
  MdlListItemSecondaryActionComponent,
  MdlListItemSubTitleComponent,
  MdlListItemSecondaryInfoComponent,
  MdlListItemTextBodyComponent,
  MdlProgressComponent,
  MdlRadioComponent,
  MdlShadowDirective,
  MdlSliderComponent,
  MdlSpinnerComponent,
  MdlSwitchComponent,
  MdlTooltipComponent,
  MdlTooltipDirective,
  MdlTooltipLargeDirective,
  MdlTableComponent,
  MdlSelectableTableComponent,
  MdlMenuComponent,
  MdlMenuItemComponent,
  MdlMenuItemRippleDirective,
  MdlMenuItemFullBleedDeviderComponent,
  MdlLayoutComponent,
  MdlLayoutHeaderComponent,
  MdlLayoutDrawerComponent,
  MdlLayoutContentComponent,
  MdlLayoutHeaderTransparentDirective,
  MdlLayoutHeaderRowComponent,
  MdlLayoutTitleComponent,
  MdlLayoutSpacerComponent,
  MdlTabsComponent,
  MdlTabPanelComponent,
  MdlLayoutTabPanelComponent,
  MdlTextFieldComponent
];
