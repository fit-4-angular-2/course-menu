import { AppStateInjector } from './app-state.injector';
import { TestBed, inject } from '@angular/core/testing';

describe('AppStateService', () => {

  let appStateInjector: AppStateInjector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppStateInjector]
    });
  });

  beforeEach(inject([AppStateInjector], (_appStateInjector: AppStateInjector) => {
    appStateInjector = _appStateInjector;
  }));


  it('should throw an error if the action did not conform to IAppAction', () => {

    expect( () => { appStateInjector.resolveAndInstantiate(TestAction); } ).toThrow();

  });

});


class TestAction {

};
