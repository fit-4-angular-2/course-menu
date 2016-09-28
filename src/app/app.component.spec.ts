
import {
  inject,
  async,
  TestBed
} from '@angular/core/testing';
import { AppComponent, AppModule } from './index';
import {
  Router,
  UrlTree
} from '@angular/router';
import { Subject } from 'rxjs/Rx';
import {APP_BASE_HREF} from '@angular/common';
import {SITE_KEY} from './consts';
import { MockItemsService } from './model/items.service.spec';
import { ItemsService } from './model/items.service';

export class MockRouter {

  public events = new Subject();
  public routerState = {
    root: null
  };

  public navigate(commands: any[]) {}

  public createUrlTree() {}

  public serializeUrl(url: UrlTree) {return ''; };

}

describe('App: CourseMenu', () => {

  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ],
      declarations: [],
      providers: [
        { provide: Router, useValue: new MockRouter()},
        { provide: APP_BASE_HREF, useValue: '/'},
        { provide: SITE_KEY, useValue: null},
        { provide: ItemsService, useClass: MockItemsService},
      ]
    });
    TestBed.compileComponents();
  }));

  beforeEach(async(inject([Router], (_router: Router) => {
    router = _router;
  })));

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
  }));

  it('should have as title \'Angular 2 CourseMenu\'', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.title).toEqual('Angular 2 CourseMenu');
  }));


  it('should navigate to home', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let app = fixture.componentInstance;
    spyOn(router, 'navigate');
    app.gotoHome();
    expect(router.navigate).toHaveBeenCalled();
  }));


});
