
import {
  TestBed,
  inject,
  async,
  ComponentFixture
} from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ItemsService } from './../model/items.service';
import { AppStateService } from './../model/index';
import { AppModule } from '../app.module';
import { SITE_KEY } from './../consts';
import { MockItemsService } from './../model/items.service.spec';
import { LoadCourseItemsAction } from '../actions/load-course-items.action';


describe('HomeComponent', () => {

  let mockService: MockItemsService;
  let appStateService: AppStateService;
  let fixture: ComponentFixture<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ],
      declarations: [],
      providers: [
        { provide: ItemsService, useClass: MockItemsService},
        { provide: SITE_KEY, useValue: null}
      ]
    });
    TestBed.compileComponents().catch((e) => {
      console.error(e);
    }).then( () => {
      fixture  = TestBed.createComponent(HomeComponent);
    });
  }));



  beforeEach(async(inject([ItemsService, AppStateService],
    (_mockService: ItemsService, _appStateService: AppStateService ) => {
      mockService = <any> _mockService;
      appStateService = _appStateService;
  })));

  it('should create the home component', async((  ) => {
    fixture.detectChanges();
    let homeComp = fixture.componentInstance;
    expect(homeComp).toBeTruthy();

  }));

  it('should have an item', async(( done )  => {
    let homeComp = fixture.componentInstance;
    fixture.detectChanges();
    expect(homeComp.isLoading).toBe(false);

    fixture.whenStable().then( () => {
      appStateService.dispatchAction(LoadCourseItemsAction);
      // forward to CourseItemsLoadedActon by skipping the load action
      appStateService.getAppState().skip(1).subscribe( () => {
        expect(homeComp.items.length).toEqual(1);
        expect(homeComp.isLoading).toBe(false);
        done();
      });

    });

  }));

  // not in async. otherwise the async function termintaes with error because of the rejected promise
  it('should set the error state if an http error occures', async(( done)  => {

      let homeComp = fixture.componentInstance;
      expect(homeComp.isHttpError).toBe(false);
      mockService.resultWithError = true;

      fixture.detectChanges();
      fixture.whenStable().then( () => {

        appStateService.dispatchAction(LoadCourseItemsAction);
        // forward to ErrorBackendAction by skipping the load action
        appStateService.getAppState().skip(1).subscribe( () => {
          expect(homeComp.isHttpError).toBe(true);
          done();
        });

      });

  }));


  xit('should mark missing fields', (( done ) => {

    fixture.detectChanges();
    let homeComp = fixture.componentInstance;
    fixture.whenStable().then( () => {

      expect(homeComp.form.valid).toBe(false);

      appStateService.dispatchAction(LoadCourseItemsAction);
      // forward to Loaded action by skipping the load action
      appStateService.getAppState().skip(1).subscribe( () => {

        // If one item is selected, a contact is given and the attendie count is present it should be false
       // fillInRequiredFileds(homeComp);
        console.log('ng what? 2' );
        console.log(homeComp.form);

        expect(homeComp.form.valid).toBe(true);

        done();
      });

    });

  }));


  xit('should not call itemsService.sendSelections if there are missing fileds', async(() => {
    let homeComp = fixture.componentInstance;
    spyOn(mockService, 'sendSelections');

    fixture.detectChanges();
    fixture.whenStable().then( () => {
      homeComp.send();
      expect(mockService.sendSelections).not.toHaveBeenCalled();
    });

  }));

  xit('should send the selections if all required fields are present', async(( done ) => {
    let homeComp = fixture.componentInstance;

    fixture.detectChanges();
    fixture.whenStable().then( () => {

      expect(homeComp.isDataSend).toBe(false);

      appStateService.dispatchAction(LoadCourseItemsAction);
      // forward to Loaded action by skipping the load action
      appStateService.getAppState().skip(1).subscribe( () => {

        fillInRequiredFileds(homeComp);

        homeComp.send().then( () => {
          expect(homeComp.isDataSend).toBe(true);
        });

        done();
      });

    });

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

        mockService.resultWithError = true;

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
  homeComp.items[0].selected = true;
  homeComp.contact = 'a';
  homeComp.countOfAttendies = '1';
  homeComp.onToken({'token': 'x'});
}

