import {
  inject,
  TestBed
} from '@angular/core/testing';

import { AppStateService, IAppAction } from './app-state.service';
import { CourseItem } from './course-item';
import { AppState } from './app-state';

let oneItem = new CourseItem('theTitle', 'expl.');

class TestAction implements IAppAction {

  public createNewState(oldState: AppState) {
    let newState = oldState.cloneState();

    newState.items = [...oldState.items, oneItem];

    return newState;
  }
}

describe('AppStateService', () => {

  let appStateService: AppStateService;

  beforeEach( () => {
    TestBed.configureTestingModule({
      providers: [AppStateService, TestAction]
    });
  });

  beforeEach(inject([AppStateService], (_appStateService: AppStateService) => {
    appStateService = _appStateService;
  }));


  it('should have an initial empty array as state', ( done ) => {
    appStateService.getAppState().subscribe( (appState) => {

      expect(appState.items).toEqual([]);
      done();

    });

  });

  it('should add items that are loaded from the backend', ( done ) => {

    appStateService.dispatchAction(TestAction);

    const appState = appStateService.getLastAppState();

    expect(appState.items).toEqual([oneItem]);
    done();
  });

});

