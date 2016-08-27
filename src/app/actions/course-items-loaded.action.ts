import {
  Injectable,
  Inject,
  OpaqueToken
} from '@angular/core';
import {
  CourseItem,
  AppState,
  IAppAction
} from '../model';


export let ITEMS = new OpaqueToken('items');

@Injectable()
export class CourseItemsLoadedAction implements IAppAction {

  constructor(@Inject(ITEMS) private items: CourseItem[]) {
  }

  createNewState(curentState: AppState): AppState {

    let newState = curentState.cloneState();
    newState.items = this.items;
    newState.uiState.isLoading = false;
    return newState;
  }

}
