import {
  addProviders,
  inject
} from '@angular/core/testing';
import { ItemsService } from './items.service';
import { Item } from './item';
import { MockBackend } from '@angular/http/testing';
import {
  BaseRequestOptions,
  Http,
  Response,
  ResponseOptions
} from '@angular/http';
import { SERVER_URL_TOKEN } from './../consts';


beforeEach(() => {
  addProviders([
    ItemsService,
    MockBackend,
    BaseRequestOptions,
    { provide: SERVER_URL_TOKEN, useValue: 'whatever' },
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

    service.loadItems().then(items => {
      expect(items.length).toEqual(1);
      done();
    });

  });


  it('should send the selection to the server', ( done ) => {
    let sendData = {items: [], contact: 'contact', countOfAtendies: '3'};
    mockbackend.connections.subscribe(connection => {

      expect(connection.request.headers.get('google-token')).toBe('token');
      expect(connection.request.headers.get('Content-Type')).toBe('application/json');

      expect(connection.request.json().replace(/\\"/g, '"')).toEqual('"' + JSON.stringify(sendData) + '"');

      connection.mockRespond(
        new Response(
          new ResponseOptions({})
        )
      );

    });

    service.sendSelections(sendData, 'token'). then(  () => {
      done();
    });
  });

  it('should reject if an error occurs during data send', ( done ) => {
    let sendData = {items: [], contact: 'contact', countOfAtendies: '3'};

    mockbackend.connections.subscribe(connection => {
      connection.mockError(new Error('some error'));
    });

    service.sendSelections(sendData, 'token'). catch(  () => {
      done();
    });

  });


});

