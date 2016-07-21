
import {
  beforeEach,
  addProviders,
  describe,
  expect,
  it,
  inject,
  async
} from '@angular/core/testing';
import { provide } from '@angular/core';
import { AppComponent, appRouterProviders } from './index';
import {
  Router
} from '@angular/router';
import { Subject } from 'rxjs/Rx';

export class MockRouter {

  public events = new Subject();

  public navigate(commands: any[]) {
  }

}

beforeEach(() => {
  addProviders([AppComponent]);
  addProviders([...appRouterProviders]);
  addProviders([provide(Router, {useValue: new MockRouter()})]);
});

describe('App: CourseMenu', () => {
  it('should create the app',
      inject([AppComponent], (app: AppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'CourseMenu\'',
      inject([AppComponent], (app: AppComponent) => {
    expect(app.title).toEqual('CourseMenu');
  }));

  it('should navigate to home', async(inject([AppComponent, Router], (app: AppComponent, router: Router) => {

    spyOn(router, 'navigate');
    app.gotoHome();
    expect(router.navigate).toHaveBeenCalled();

  })));


});
