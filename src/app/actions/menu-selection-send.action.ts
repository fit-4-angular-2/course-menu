import {
  Injectable
} from '@angular/core';
import {
  AppState,
  IAppAction
} from '../model';

@Injectable()
export class MenuSelectionSendAction implements IAppAction {

  createNewState(curentState: AppState): AppState {
    let newState = curentState.cloneState();
    newState.uiState.isLoading = false;
    newState.uiState.isDataSend = true;
    return newState;
  }

}
