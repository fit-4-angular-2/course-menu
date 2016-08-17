
import {
  TestBed,
  inject,
  async,
  fakeAsync
} from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {
  ItemsService,
  IItemsService
} from './../model/items.service';
import { Item } from './../model/item';
import { MenuSelection } from '../model/menuSelection';
import { FormsModule } from '@angular/forms';
import {AppModule} from '../app.module';

let oneItem =  [new Item('Grundlagen', 'Projekt erstellen, Arbeiten mit Angular CLI, Komponenten')];

class MockItemsService implements IItemsService {

  public resultWithError = false;

  public loadItems(): Promise<Item[]> {
    return this.resultWithError ? Promise.reject<Item[]>(null) : Promise.resolve(oneItem);
  }
  sendSelections(selecttion: MenuSelection, token: String): Promise<boolean> {
    return this.resultWithError ? Promise.reject<boolean>(null) : Promise.resolve(true);
  }
}


describe('HomeComponent', () => {

  let mockService: MockItemsService;
  let hCFixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ],
      declarations: [],
      providers: [
        { provide: ItemsService, useClass: MockItemsService}
      ]
    });
    TestBed.compileComponents().catch((e) => {
      console.error(e);
    }).then( () => {
      hCFixture  = TestBed.createComponent(HomeComponent);
    });
  }));

  describe('', () => {


  // beforeEach(async(inject([ItemsService], (_mockService: ItemsService ) => {
  //   mockService = <any> _mockService;
  //   console.log(mockService);
  // })));

  // it('should create the home component', async(( done ) => {
  //   hCFixture.detectChanges();
  //   let homeComp = hCFixture.componentInstance;
  //   expect(homeComp).toBeTruthy();
  //   done();
  // }));

  // it('should have an item', ( done )  => {
  //   TestBed.compileComponents().then(() => {
  //     let homeComp = TestBed.createComponent(HomeComponent).componentInstance;
  //     expect(homeComp.isLoading).toBe(true);
  //     homeComp.ngOnInit().then( () => {
  //       expect(homeComp.items.length).toEqual(1);
  //       expect(homeComp.isLoading).toBe(false);
  //       done();
  //     });
  //   });
  // });
  //
  // it('should set the error state if an http error occures', ( done )  => {
  //   TestBed.compileComponents().then(() => {
  //     let homeComp = TestBed.createComponent(HomeComponent).componentInstance;
  //     expect(homeComp.isHttpError).toBe(false);
  //     mockService.resultWithError = true;
  //     homeComp.ngOnInit().catch( () => {
  //       expect(homeComp.isHttpError).toBe(true);
  //       done();
  //     });
  //   });
  // });

  //
  // xit('should mark missing fields', ( done ) => {
  //
  //   homeComp.ngOnInit().then( () => {
  //     expect(homeComp.hasMissingFields()).toBe(true);
  //
  //     // If one item is selected, a contact is given and the attendie count is present it should be false
  //     fillInRequiredFileds(homeComp);
  //
  //     expect(homeComp.hasMissingFields()).toBe(false);
  //
  //     done();
  //   });
  //
  // });
  //
  // xit('should not call itemsService.sendSelections if there are missing fileds', ( done ) => {
  //
  //   spyOn(mockService, 'sendSelections');
  //
  //   homeComp.send();
  //
  //   expect(mockService.sendSelections).not.toHaveBeenCalled();
  //
  //   done();
  // });
  //
  // xit('should send the selections if all required fields are present', ( done ) => {
  //   homeComp.ngOnInit().then( () => {
  //
  //     expect(homeComp.isDataSend).toBe(false);
  //
  //     fillInRequiredFileds(homeComp);
  //
  //     homeComp.send().then( () => {
  //       expect(homeComp.isDataSend).toBe(true);
  //       done();
  //     });
  //
  //   });
  // });
  //
  // xit('should mark an error state if an error occures during send data', ( done ) => {
  //
  //   homeComp.ngOnInit().then( () => {
  //
  //     expect(homeComp.isDataSend).toBe(false);
  //     expect(homeComp.isSendError).toBe(false);
  //
  //     fillInRequiredFileds(homeComp);
  //
  //     mockService.resultWithError = true;
  //
  //     homeComp.send().catch( () => {
  //       expect(homeComp.isDataSend).toBe(true);
  //       expect(homeComp.isSendError).toBe(true);
  //       done();
  //     });
  //
  //   });
  //
  // });
  });
});


function fillInRequiredFileds(homeComp) {
  homeComp.items[0].selected = true;
  homeComp.contact = 'a';
  homeComp.countOfAttendies = '1';
  homeComp.onToken({'token': 'x'});
}

