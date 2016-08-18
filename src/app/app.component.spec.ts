
import {
  addProviders,
  inject,
  async,
  TestBed
} from '@angular/core/testing';
import { ApplicationRef } from '@angular/core';
import { AppComponent, AppModule } from './index';
import {
  Router
} from '@angular/router';
import { Subject } from 'rxjs/Rx';
import {APP_BASE_HREF} from '@angular/common';

export class MockRouter {

  public events = new Subject();
  public routerState = {
    root: null
  };

  public navigate(commands: any[]) {
  }

  public createUrlTree() {

  }

}


  describe('App: CourseMenu', () => {

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ AppModule ],
        declarations: [],
        providers: [
          { provide: Router, useValue: new MockRouter()},
          { provide: APP_BASE_HREF, useValue: '/'}
        ]
      });
      TestBed.compileComponents();
    }));

    it('should create the app', () => {
      let fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();

      expect(fixture.componentInstance).toBeTruthy();
    });
    //
    // it('should have as title \'Angular 2 CourseMenu\'',
    //     inject([AppComponent], (app: AppComponent) => {
    //   expect(app.title).toEqual('Angular 2 CourseMenu');
    // }));
    //
    // it('should navigate to home', async(inject([AppComponent, Router], (app: AppComponent, router: Router) => {
    //
    //   spyOn(router, 'navigate');
    //   app.gotoHome();
    //   expect(router.navigate).toHaveBeenCalled();
    //
    // })));
    //

  });
