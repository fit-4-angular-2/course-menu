import {
  IAppAction,
  AppStateService
} from '../model/index';
import { AppState } from '../model/app-state';
import { Injectable } from '@angular/core';
import { ItemsService } from '../model/items.service';
import {
  CourseItemsLoadedAction,
  ITEMS,
  ErrorBackendCallAction
} from './index';

@Injectable()
export class LoadCourseItemsAction implements IAppAction {

  constructor(private itemsService: ItemsService, private appState: AppStateService) {}

  createNewState(curentState: AppState): AppState {

    let newState = curentState.cloneState();
    newState.items = [];
    newState.uiState.isLoading = true;

    this.itemsService.loadItems().subscribe( (items) => {
      this.appState.dispatchAction(CourseItemsLoadedAction, [{provide: ITEMS, useValue: items }]);
    }, (error) => {
        this.appState.dispatchAction(ErrorBackendCallAction);
      });

    return newState;
  }
}
