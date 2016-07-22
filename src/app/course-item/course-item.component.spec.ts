
import {
  beforeEach,
  addProviders,
  describe,
  expect,
  it,
  inject,
  async,
  fakeAsync
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { TestComponentBuilder, ComponentFixture } from '@angular/compiler/testing';
import { CourseItemComponent } from './course-item.component';
import {
  MdlListItemPrimaryContentComponent,
  MdlCheckboxComponent,
  MDL_DIRECTIVES
} from 'angular2-mdl';
import { Item } from './../model/item';


beforeEach(() => {
  addProviders([
    CourseItemComponent
  ]);
});

describe('CourseItemComponent', () => {

  let builder: TestComponentBuilder;
  let courseItemComp: CourseItemComponent;

  beforeEach(inject([TestComponentBuilder, CourseItemComponent],
    (tcb: TestComponentBuilder, _courseItemComp: CourseItemComponent ) => {
      builder = tcb;
      courseItemComp = _courseItemComp;
  }));

  it('should create the course item component', async( () => {
      expect(courseItemComp).toBeTruthy();
  }));


  it('should toggle the item state if the mdl-list-item-primary-content is clicked', async(( ) => {

    builder
      .createAsync(TestComponent).then( (fixture: ComponentFixture<TestComponent>) => {

        fakeAsync(() => {
          fixture.detectChanges();

          let courseItemComponent = fixture.debugElement.query(By.directive(CourseItemComponent)).componentInstance;

          let listItemContent = fixture.debugElement.query(By.directive(MdlListItemPrimaryContentComponent)).nativeElement;

          expect(courseItemComponent.item.selected).toBe(false);

          listItemContent.click();

          expect(courseItemComponent.item.selected).toBe(true);
        })();

      });

  }));

  it('should change the item selection state on checkbox-click', async(() => {
    builder
      .createAsync(TestComponent).then( (fixture: ComponentFixture<TestComponent>) => {

      fixture.detectChanges();

      let courseItemComponent = fixture.debugElement.query(By.directive(CourseItemComponent)).componentInstance;
      let checkbox = fixture.debugElement.query(By.directive(MdlCheckboxComponent)).nativeElement;

      expect(courseItemComponent.item.selected).toBe(false);

      checkbox.click();

      expect(courseItemComponent.item.selected).toBe(true);
    });
  }));

});


@Component({
  selector: 'test-component',
  template: '<mdl-list><course-item [item]="item"></course-item></mdl-list>',
  directives: [CourseItemComponent, MDL_DIRECTIVES]
})
class TestComponent {
  public item = new Item('Grundlagen', 'Projekt erstellen, Arbeiten mit Angular CLI, Komponenten', false);
}
