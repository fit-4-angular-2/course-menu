
import {
  beforeEach,
  addProviders,
  describe,
  expect,
  it,
  inject,
  async
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { HomeComponent } from './home.component';
import {
  ItemsService,
  IItemsService
} from './../model/items.service';
import { Item } from './../model/item';
import { MenuSelection } from '../model/menuSelection';

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

  beforeEach(() => {
    addProviders([
      HomeComponent,
      { provide: ItemsService, useClass: MockItemsService},
    ]);
  });

  let builder: TestComponentBuilder;
  let homeComp: HomeComponent;
  let mockService: MockItemsService;

  beforeEach(inject([TestComponentBuilder, HomeComponent, ItemsService],
    (tcb: TestComponentBuilder, _homeComp: HomeComponent, _mockService: ItemsService ) => {
      builder = tcb;
      homeComp = _homeComp;
      mockService = <any> _mockService;
  }));

  it('should create the home component', async( () => {
      expect(homeComp).toBeTruthy();
  }));

  it('should have an item', ( done )  => {
      expect(homeComp.isLoading).toBe(true);
      homeComp.ngOnInit().then( () => {
        expect(homeComp.items.length).toEqual(1);
        expect(homeComp.isLoading).toBe(false);
        done();
      });
  });

  it('should set the error state if an http error occures', ( done )  => {

    expect(homeComp.isHttpError).toBe(false);
    mockService.resultWithError = true;
    homeComp.ngOnInit().catch( () => {
      expect(homeComp.isHttpError).toBe(true);
      done();
    });
  });


  it('should mark missing fields', ( done ) => {

    homeComp.ngOnInit().then( () => {
      expect(homeComp.hasMissingFields()).toBe(true);

      // If one item is selected, a contact is given and the attendie count is present it should be false
      fillInRequiredFileds(homeComp);

      expect(homeComp.hasMissingFields()).toBe(false);

      done();
    });

  });

  it('should not call itemsService.sendSelections if there are missing fileds', ( done ) => {

    spyOn(mockService, 'sendSelections');

    homeComp.send();

    expect(mockService.sendSelections).not.toHaveBeenCalled();

    done();
  });

  it('should send the selections if all required fields are present', ( done ) => {
    homeComp.ngOnInit().then( () => {

      expect(homeComp.isDataSend).toBe(false);

      fillInRequiredFileds(homeComp);

      homeComp.send().then( () => {
        expect(homeComp.isDataSend).toBe(true);
        done();
      });

    });
  });

  it('should mark an error state if an error occures during send data', ( done ) => {

    homeComp.ngOnInit().then( () => {

      expect(homeComp.isDataSend).toBe(false);
      expect(homeComp.isSendError).toBe(false);

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


function fillInRequiredFileds(homeComp) {
  homeComp.items[0].selected = true;
  homeComp.contact = 'a';
  homeComp.countOfAttendies = '1';
  homeComp.onToken({'token': 'x'});
}


@Component({
  selector: 'test-test',
  template: 'replaced by the test',
  directives: [HomeComponent]
})
class TestComponent {
}
