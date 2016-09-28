import {
  Injectable
} from '@angular/core';
import {
  AppState,
  IAppAction
} from '../model';



@Injectable()
export class ErrorBackendCallAction implements IAppAction {


  createNewState(curentState: AppState): AppState {

    let newState = curentState.cloneState();
    newState.uiState.isLoading = false;
    newState.uiState.isDataSend = false;
    newState.uiState.isHttpError = true;
    return newState;
  }

}
