
import {
  beforeEach,
  addProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { HomeComponent } from './home.component';
import { MdlListItemPrimaryContentComponent } from 'angular2-mdl';




beforeEach(() => {
  addProviders([HomeComponent]);
});

describe('HomeComponent', () => {

  let builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should create the home component',
    inject([HomeComponent], (app: HomeComponent) => {
      expect(app).toBeTruthy();
    }));

  it('should have an item',
    inject([HomeComponent], (app: HomeComponent) => {
      expect(app.items.length).toBe(1);
    }));

  it('shpuld toggle the item state if the mdl-list-item-primary-content is clicked', ( done ) => {

    return builder
      .overrideTemplate(TestComponent, `
          <app-home></app-home>
        `)
      .createAsync(TestComponent).then( (fixture: ComponentFixture<TestComponent>) => {

        fixture.detectChanges();

        let appHomeComponent = fixture.debugElement.query(By.directive(HomeComponent)).componentInstance;
        let listItemContent = fixture.debugElement.query(By.directive(MdlListItemPrimaryContentComponent)).nativeElement;

        expect(appHomeComponent.items[0].selected).toBe(false);

        listItemContent.click();

        expect(appHomeComponent.items[0].selected).toBe(true);

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
