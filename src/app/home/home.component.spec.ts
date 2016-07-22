
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
import { ItemsService } from './../model/items.service';
import { Item } from './../model/item';
import {MockBackend} from '@angular/http/testing';
import {
  BaseRequestOptions,
  Http,
  Response,
  ResponseOptions,
} from '@angular/http';

let oneItem =  [new Item('Grundlagen', 'Projekt erstellen, Arbeiten mit Angular CLI, Komponenten')];

beforeEach(() => {
  addProviders([
    HomeComponent,
    ItemsService,
    MockBackend,
    BaseRequestOptions,
    { provide: Http,
      useFactory: (backend, options) => new Http(backend, options),
      deps: [MockBackend, BaseRequestOptions] }
  ]);
});

describe('HomeComponent', () => {

  let builder: TestComponentBuilder;
  let homeComp: HomeComponent;
  let mockbackend: MockBackend;

  beforeEach(inject([TestComponentBuilder, HomeComponent, MockBackend],
    (tcb: TestComponentBuilder, _homeComp: HomeComponent, _mockbackend: MockBackend ) => {
      builder = tcb;
      homeComp = _homeComp;
      mockbackend = _mockbackend;
  }));

  it('should create the home component', async( () => {
      expect(homeComp).toBeTruthy();
  }));

  it('should have an item', ( done )  => {

    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(
        new Response(
          new ResponseOptions({body: JSON.stringify({data: oneItem})})
        )
      );
    });

    expect(homeComp.isLoading).toBe(true);

    homeComp.ngOnInit();

    homeComp.obsItems.subscribe(items => {
      expect(items.length).toEqual(1);
      expect(homeComp.isLoading).toBe(false);
      done();
    });

  });

  it('should set the error state if an http error occures', ( done )  => {

    mockbackend.connections.subscribe(connection => {
      connection.mockError();
    });

    expect(homeComp.isHttpError).toBe(false);

    homeComp.ngOnInit();

    homeComp.obsItems.subscribe(
      items => {},
      e => {
      expect(homeComp.isHttpError).toBe(true);
      done();
    });

  });


  it('should mark missing fields', ( done ) => {

    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(
        new Response(
          new ResponseOptions({body: JSON.stringify({data: oneItem})})
        )
      );
    });

    homeComp.ngOnInit();

    homeComp.obsItems.subscribe(
      () => {

        expect(homeComp.hasMissingFields()).toBe(true);

        // If one item is selected, a contact is given and the attendie count is present it should be false
        homeComp.items[0].selected = true;
        homeComp.contact = 'a';
        homeComp.countOfAttendies = '1';

        expect(homeComp.hasMissingFields()).toBe(false);

        done();
      }
    );


  });

});


@Component({
  selector: 'test-test',
  template: 'replaced by the test',
  directives: [HomeComponent]
})
class TestComponent {
}
