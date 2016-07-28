
import {
  beforeEach,
  addProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { ItemsService } from './items.service';
import { Item } from './item';
import {MockBackend} from '@angular/http/testing';
import {
  BaseRequestOptions,
  Http,
  Response,
  ResponseOptions,
} from '@angular/http';


beforeEach(() => {
  addProviders([
    ItemsService,
    MockBackend,
    BaseRequestOptions,
    { provide: Http,
      useFactory: (backend, options) => new Http(backend, options),
      deps: [MockBackend, BaseRequestOptions] }
  ]);
});

describe('ItemsService', () => {

  let service: ItemsService;
  let mockbackend: MockBackend;

  beforeEach(inject([ItemsService, MockBackend],
    (_service: ItemsService, _mockbackend: MockBackend ) => {
      service = _service;
      mockbackend = _mockbackend;
  }));


  it('should have an item after request', ( done )  => {

    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(
        new Response(
          new ResponseOptions({
            body: JSON.stringify( {courses: [new Item('a', 'b')]} )
          })
        )
      );
    });

    service.loadItems().subscribe(items => {
      expect(items.length).toEqual(1);
      done();
    });

  });


  it('should cash the result', ( done )  => {

    let item = new Item('a', 'b');
    mockbackend.connections.subscribe(connection => {
      connection.mockRespond(
        new Response(
          new ResponseOptions({
            body: JSON.stringify( {courses: [item]} )
          })
        )
      );
    });

    // initial load
    service.loadItems().subscribe(items => {});

    // change the item to detect if the result changes
    item.title = 'c';

    service.loadItems().subscribe(itemsNext => {
      expect(itemsNext[0].title).toBe('a');
      done();
    });

  });


  it('should redo the request id the first one error', ( done )  => {
    let counter = 0;
    mockbackend.connections.subscribe(connection => {

      // let the first call fail
      if (counter === 0) {
        connection.mockError();
        counter++;
        return;
      }

      connection.mockRespond(
        new Response(
          new ResponseOptions({
            body: JSON.stringify( {courses: [new Item('a', 'b')]} )
          })
        )
      );
    });

    service.loadItems().subscribe(items => {}, () => {});

    service.loadItems().subscribe(items => {
      expect(items.length).toEqual(1);
      done();
    });

  });


});

