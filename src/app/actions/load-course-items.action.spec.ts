import {
  TestBed,
  inject
} from '@angular/core/testing';

import {
  AppState
} from '../model/app-state';
import { oneItem } from './../model/items.service.spec';
import { MockItemsService } from './../model/items.service.spec';
import { ItemsService } from './../model/items.service';
import { AppStateService } from '../model/app-state.service';
import { LoadCourseItemsAction } from './load-course-items.action';
import { ErrorBackendCallAction } from './error-backend-call.action';
import { CourseItemsLoadedAction, ITEMS } from './course-items-loaded.action';
import { AppStateInjector } from '../model/app-state.injector';

describe('LoadCourseItemsAction', () => {

  let mockService: MockItemsService;
  let action: LoadCourseItemsAction;
  let appStateService: AppStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [  ],
      providers: [
        LoadCourseItemsAction,
        AppStateService,
        AppStateInjector,
        { provide: ItemsService, useClass: MockItemsService}
      ]
    });
  });

  beforeEach(inject([ItemsService, LoadCourseItemsAction, AppStateService],
    (_mockService: ItemsService, _action: LoadCourseItemsAction, _appStateService: AppStateService ) => {
      mockService = <any> _mockService;
      action = _action;
      appStateService = _appStateService;
    }));

  it('should set the ui state to loading and forward to CourseItemsLoadedAction', () => {

    spyOn(appStateService, 'dispatchAction');

    let initState = AppState.createEmptyState();

    let stateAfter = action.createNewState(initState);

    expect(stateAfter.uiState.isLoading).toBe(true, 'isLoading == true');
    expect(appStateService.dispatchAction).toHaveBeenCalledWith(CourseItemsLoadedAction, [{provide: ITEMS, useValue: oneItem }]);

  });

  it('should set the uistate to loading and forward to ErrorBackendCallAction', () => {

    mockService.resultWithError = true;

    spyOn(appStateService, 'dispatchAction');

    let initState = AppState.createEmptyState();

    let stateAfter = action.createNewState(initState);

    expect(stateAfter.uiState.isLoading).toBe(true, 'isLoading == true');
    expect(appStateService.dispatchAction).toHaveBeenCalledWith(ErrorBackendCallAction);

  });

});
