
import {
  beforeEach,
  addProviders,
  describe,
  expect,
  it,
  inject,
  async
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { HomeComponent } from './home.component';
import {
  MdlListItemPrimaryContentComponent,
  MdlCheckboxComponent
} from 'angular2-mdl';




beforeEach(() => {
  addProviders([HomeComponent]);
});

describe('HomeComponent', () => {

  let builder: TestComponentBuilder;

  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should create the home component',
    async(inject([HomeComponent], (app: HomeComponent) => {
      expect(app).toBeTruthy();
    })));

  it('should have an item',
    async(inject([HomeComponent], (app: HomeComponent) => {
      expect(app.items.length).toBe(1);
    })));

  it('should toggle the item state if the mdl-list-item-primary-content is clicked', async(( ) => {

    builder
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
      });

  }));

  it('should change the item selection state on checkbox-click', async(() => {
    builder
      .overrideTemplate(TestComponent, `
          <app-home></app-home>
        `)
      .createAsync(TestComponent).then( (fixture: ComponentFixture<TestComponent>) => {

      fixture.detectChanges();

      let appHomeComponent = fixture.debugElement.query(By.directive(HomeComponent)).componentInstance;
      let checkbox = fixture.debugElement.query(By.directive(MdlCheckboxComponent)).nativeElement;

      expect(appHomeComponent.items[0].selected).toBe(false);

      checkbox.click();

      expect(appHomeComponent.items[0].selected).toBe(true);
    });
  }));

});


@Component({
  selector: 'test-test',
  template: 'replaced by the test',
  directives: [HomeComponent]
})
class TestComponent {
}
