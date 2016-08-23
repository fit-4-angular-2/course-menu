
import {
  TestBed,
  inject,
  async,
  ComponentFixture
} from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {
  ItemsService,
  IItemsService
} from './../model/items.service';
import { CourseItem } from './../model/course-item';
import { AppState } from '../model/app-state';
import { AppModule } from '../app.module';
import { SITE_KEY } from './../consts';

let oneItem =  [new CourseItem('Grundlagen', 'Projekt erstellen, Arbeiten mit Angular CLI, Komponenten')];

class MockItemsService implements IItemsService {

  public resultWithError = false;

  public loadItems(): Promise<CourseItem[]> {
    return this.resultWithError ? Promise.reject<CourseItem[]>([]) : Promise.resolve(oneItem);
  }
  sendSelections(selecttion: AppState, token: String): Promise<boolean> {
    return this.resultWithError ? Promise.reject<boolean>(false) : Promise.resolve(true);
  }
}


describe('HomeComponent', () => {

  let mockService: MockItemsService;
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



  beforeEach(async(inject([ItemsService], (_mockService: ItemsService ) => {
    mockService = <any> _mockService;
  })));

  it('should create the home component', async((  ) => {
    fixture.detectChanges();
    let homeComp = fixture.componentInstance;
    expect(homeComp).toBeTruthy();

  }));

  it('should have an item', async(()  => {
    let homeComp = fixture.componentInstance;
    expect(homeComp.isLoading).toBe(true);

    fixture.detectChanges();
    fixture.whenStable().then( () => {
      expect(homeComp.items.length).toEqual(1);
      expect(homeComp.isLoading).toBe(false);
    });

  }));

  // not in async. otherwise the async function termintaes with error because of the rejected promise
  it('should set the error state if an http error occures', ()  => {

      let homeComp = fixture.componentInstance;
      expect(homeComp.isHttpError).toBe(false);
      mockService.resultWithError = true;

      homeComp.ngOnInit().catch( (e) => {
        expect(homeComp.isHttpError).toBe(true);
      });

  });


  it('should mark missing fields', async(() => {
    fixture.detectChanges();
    let homeComp = fixture.componentInstance;
    fixture.whenStable().then( () => {
      expect(homeComp.hasMissingFields()).toBe(true);

      // If one item is selected, a contact is given and the attendie count is present it should be false
      fillInRequiredFileds(homeComp);

      expect(homeComp.hasMissingFields()).toBe(false);
    });

  }));


  it('should not call itemsService.sendSelections if there are missing fileds', async(() => {
    let homeComp = fixture.componentInstance;
    spyOn(mockService, 'sendSelections');

    fixture.detectChanges();
    fixture.whenStable().then( () => {
      homeComp.send();
      expect(mockService.sendSelections).not.toHaveBeenCalled();
    });

  }));

  it('should send the selections if all required fields are present', async(() => {
    let homeComp = fixture.componentInstance;

    fixture.detectChanges();
    fixture.whenStable().then( () => {

      expect(homeComp.isDataSend).toBe(false);

      fillInRequiredFileds(homeComp);

      homeComp.send().then( () => {
        expect(homeComp.isDataSend).toBe(true);
      });

    });

  }));

  // not in async. otherwise the async function termintaes with error because of the rejected promise
  it('should mark an error state if an error occures during send data', () => {

    let homeComp = fixture.componentInstance;

    fixture.detectChanges();
    fixture.whenStable().then( () => {

      expect(homeComp.isDataSend).toBe(false);
      expect(homeComp.isSendError).toBe(false);

      fillInRequiredFileds(homeComp);

      mockService.resultWithError = true;

      homeComp.send().catch( () => {
        expect(homeComp.isDataSend).toBe(true);
        expect(homeComp.isSendError).toBe(true);
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

