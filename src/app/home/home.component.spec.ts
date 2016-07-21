
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
  let app: HomeComponent;
  let mockbackend: MockBackend;

  beforeEach(inject([TestComponentBuilder, HomeComponent, MockBackend],
    (tcb: TestComponentBuilder, homeComp: HomeComponent, _mockbackend: MockBackend ) => {
      builder = tcb;
      app = homeComp;
      mockbackend = _mockbackend;
  }));

  it('should create the home component', async( () => {
      expect(app).toBeTruthy();
  }));

  it('should have an item', ( done )  => {

    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(
        new Response(
          new ResponseOptions({body: JSON.stringify({data: oneItem})})
        )
      );
    });

    expect(app.isLoading).toBe(true);

    app.ngOnInit();

    app.items.subscribe(items => {
      expect(items.length).toEqual(1);
      expect(app.isLoading).toBe(false);
      done();
    });

  });

  it('should set the error state if an http error occures', ( done )  => {

    mockbackend.connections.subscribe(connection => {
      connection.mockError();
    });

    expect(app.isHttpError).toBe(false);

    app.ngOnInit();

    app.items.subscribe(
      items => {},
      e => {
      expect(app.isHttpError).toBe(true);
      done();
    });

  });


});


@Component({
  selector: 'test-test',
  template: 'replaced by the test',
  directives: [HomeComponent]
})
class TestComponent {
}
