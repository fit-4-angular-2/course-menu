import {
  Injectable ,
  OpaqueToken,
  Inject
} from '@angular/core';

import { ItemsService } from '../model/items.service';
import {
  IAppAction,
  AppStateService
} from '../model/index';
import {
  AppState,
  MenuSelection
} from '../model/app-state';
import {
  MenuSelectionSendAction,
  ErrorBackendCallAction
} from './index';
export let MENU_SELECTION = new OpaqueToken('menuSelection');
export let TOKEN = new OpaqueToken('token');

@Injectable()
export class SendMenuSelectionAction implements IAppAction {

  constructor(
    private itemsService: ItemsService,
    private appStateService: AppStateService,
    @Inject(MENU_SELECTION) private menuSelection: MenuSelection,
    @Inject(TOKEN) private token: String) {}

  createNewState(curentState: AppState): AppState {

    let newState = curentState.cloneState();
    newState.uiState.isLoading = true;

    this.itemsService.sendSelections(this.menuSelection, this.token).subscribe( () => {
      this.appStateService.dispatchAction(MenuSelectionSendAction);
    }, (error) => {
      this.appStateService.dispatchAction(ErrorBackendCallAction);
    });

    return newState;
  }

}
