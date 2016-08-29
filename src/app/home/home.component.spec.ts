import {Inject, Injectable} from '@angular/core';
import {
  TestBed,
  inject,
  async,
  ComponentFixture,
} from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {
  AppStateService,
  IAppAction,
  AppState
} from './../model/index';
import { AppModule } from '../app.module';
import { SITE_KEY } from './../consts';
import { LoadCourseItemsAction } from '../actions/load-course-items.action';
import { oneItem, coursItem } from '../model/items.service.spec';
import { SendMenuSelectionAction, MENU_SELECTION, TOKEN } from '../actions/index';
import { MenuSelection } from '../model/app-state';

@Injectable()
class DummyLoadCourseItemsAction implements IAppAction {

  createNewState(curentState: AppState): AppState {
    let result = curentState.cloneState();
    result.items = oneItem;
    result.uiState.isLoading = false;
    return result;
  }

}

@Injectable()
class DummyErrorLoadCourseItemsAction  implements IAppAction {

  createNewState(curentState: AppState): AppState {
    let result = curentState.cloneState();
    result.uiState.isHttpError = true;
    return result;
  }

}

@Injectable()
class DummySendMenuSelectionAction implements IAppAction {

  constructor(
    @Inject(MENU_SELECTION) private menuSelection: MenuSelection,
    @Inject(TOKEN) private token: String) {}

  createNewState(curentState: AppState): AppState {
    let result = curentState.cloneState();

    return result;
  }

}

describe('HomeComponent', () => {

  let appStateService: AppStateService;
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ],
      declarations: [],
      providers: [
        DummyLoadCourseItemsAction,
        DummyErrorLoadCourseItemsAction,
        DummySendMenuSelectionAction,
        { provide: SITE_KEY, useValue: null}, // avoid loading the re-captcha scripts
        { provide: SendMenuSelectionAction, useClass: DummySendMenuSelectionAction}
      ]
    });
    TestBed.compileComponents().catch((e) => {
      console.error(e);
    }).then( () => {
      fixture  = TestBed.createComponent(HomeComponent);
    });
  }));



  beforeEach(async(inject([AppStateService],
    (_appStateService: AppStateService ) => {
      appStateService = _appStateService;
  })));

  it('should create the home component', async((  ) => {
    fixture.detectChanges();
    let homeComp = fixture.componentInstance;
    expect(homeComp).toBeTruthy();

  }));

  it('should have an item', async(()  => {
    let homeComp = fixture.componentInstance;
    fixture.detectChanges();
    expect(homeComp.isLoading).toBe(false);

    appStateService.dispatchAction(DummyLoadCourseItemsAction);

    appStateService.getAppState().subscribe( () => {
      expect(homeComp.items.length).toEqual(1);
      expect(homeComp.isLoading).toBe(false);
    });

  }));

  // not in async. otherwise the async function termintaes with error because of the rejected promise
  it('should set the error state if an http error occures', async(( )  => {

      let homeComp = fixture.componentInstance;
      expect(homeComp.isHttpError).toBe(false);

      fixture.detectChanges();

      appStateService.dispatchAction(DummyErrorLoadCourseItemsAction);

      appStateService.getAppState().subscribe( () => {
        expect(homeComp.isHttpError).toBe(true);
      });

  }));


  it('should mark missing fields', async(() => {

    fixture.detectChanges();
    let homeComp = fixture.componentInstance;

    expect(homeComp.form.valid).toBe(false);

    appStateService.dispatchAction(DummyLoadCourseItemsAction);

    appStateService.getAppState().subscribe( () => {

      fillInRequiredFileds(homeComp);
      // run the form validation
      fixture.detectChanges();
      // remove one value
      homeComp.form.controls.contact.setValue('');
      // it must be invalid
      expect(homeComp.form.valid).toBe(false, 'form should be invalid');

      homeComp.form.controls.contact.setValue('x');
      fixture.detectChanges();
      // it must be valid
      expect(homeComp.form.valid).toBe(true, 'form should be valid');
    });

  }));


  it('should not call appStateService.dispatchAction if there are missing fileds', async(() => {

    let homeComp = fixture.componentInstance;
    spyOn(appStateService, 'dispatchAction');

    fixture.detectChanges();

    homeComp.send();
    expect(appStateService.dispatchAction).not.toHaveBeenCalled();


  }));

  it('should send the selections if all required fields are present', async(() => {
    let homeComp = fixture.componentInstance;

    fixture.detectChanges();

    expect(homeComp.isDataSend).toBe(false);

    appStateService.dispatchAction(DummyLoadCourseItemsAction);

    fillInRequiredFileds(homeComp);

    fixture.detectChanges();

    spyOn(appStateService, 'dispatchAction');
    // still not working - the dummy service is not used instead of the SendMenuSelectionAction

    homeComp.send();

    // just a hint but not really a test :(
    expect(appStateService.dispatchAction).toHaveBeenCalled();

    // let appState = appStateService.getLastAppState();

    // expect(homeComp.isDataSend).toBe(true);


  }));

  // not in async. otherwise the async function termintaes with error because of the rejected promise
  xit('should mark an error state if an error occures during send data', ( done ) => {

    let homeComp = fixture.componentInstance;

    fixture.detectChanges();
    fixture.whenStable().then( () => {

      expect(homeComp.isDataSend).toBe(false);
      expect(homeComp.isSendError).toBe(false);

      appStateService.dispatchAction(LoadCourseItemsAction);
      // forward to Loaded action by skipping the load action
      appStateService.getAppState().skip(0).subscribe( () => {

        fillInRequiredFileds(homeComp);

        //mockService.resultWithError = true;

        homeComp.send().catch( () => {
          expect(homeComp.isDataSend).toBe(true);
          expect(homeComp.isSendError).toBe(true);

          done();
        });


      });

    });

  });

});


function fillInRequiredFileds(homeComp) {
  homeComp.form.controls.selectedItems.setValue([coursItem]);
  homeComp.form.controls.contact.setValue('a');
  homeComp.form.controls.countOfAttendies.setValue('1');
  homeComp.form.controls.token.setValue('x');
}

