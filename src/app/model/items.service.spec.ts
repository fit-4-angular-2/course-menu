
import { ItemsService, IItemsService } from './items.service';

import {
  BaseRequestOptions,
  Http,
  Response,
  ResponseOptions
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { SERVER_URL_TOKEN } from './../consts';
import { AppStateService } from './app-state.service';
import { LoadCourseItemsAction } from '../actions/load-course-items.action';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { CourseItem } from './../model/index';
import { MenuSelection } from './app-state';
import { inject, TestBed } from '@angular/core/testing';


export let coursItem = new CourseItem('Grundlagen', 'Projekt erstellen, Arbeiten mit Angular CLI, Komponenten');
export let oneItem: CourseItem[] =  [coursItem];

export class MockItemsService implements IItemsService {

  public resultWithError = false;

  public loadItems(): Observable<CourseItem[]> {
    return this.resultWithError ? Observable.throw(ErrorObservable.create('error')) : Observable.of(oneItem);
  }
  sendSelections(selecttion: MenuSelection, token: String): Observable<boolean> {
    return this.resultWithError ?  Observable.throw(ErrorObservable.create('error')) : Observable.of(true);
  }
}


describe('ItemsService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ItemsService,
        MockBackend,
        BaseRequestOptions,
        AppStateService,
        LoadCourseItemsAction,
        { provide: SERVER_URL_TOKEN, useValue: 'whatever' },
        { provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions] }
      ]
    });
  });

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
            body: JSON.stringify( {courses: [new CourseItem('a', 'b')]} )
          })
        )
      );
    });

    service.loadItems().subscribe(items => {
      expect(items.length).toEqual(1);
      done();
    });

  });


  it('should send the selection to the server', ( done ) => {
    let sendData = MenuSelection.createEmptyState();
    sendData.contact = 'contact';
    sendData.countOfAtendies = '3';

    mockbackend.connections.subscribe(connection => {

      expect(connection.request.headers.get('google-token')).toBe('token');
      expect(connection.request.headers.get('Content-Type')).toBe('application/json');

      // why the hell is this an object and not a string?
      let jsonString =  JSON.stringify(connection.request.json());
      expect(jsonString).toEqual(JSON.stringify(sendData));

      connection.mockRespond(
        new Response(
          new ResponseOptions({})
        )
      );

    });

    service.sendSelections(sendData, 'token').subscribe( r => {
      expect(r).toEqual(true, 'send data did not return true');
      done();
    });


  });

  it('should reject if an error occurs during data send', ( done ) => {
    let sendData = MenuSelection.createEmptyState();
    sendData.contact = 'contact';
    sendData.countOfAtendies = '3';

    mockbackend.connections.subscribe(connection => {
      connection.mockError(new Error('some error'));
    });

    service.sendSelections(sendData, 'token'). subscribe(
      () => {},
      () => {
        done();
      }
    );

  });


});

