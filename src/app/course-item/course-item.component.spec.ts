
import {
  TestBed,
  async
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { CourseItemComponent } from './course-item.component';
import {
  MdlListItemPrimaryContentComponent,
  MdlCheckboxComponent,
  MdlModule
} from 'angular2-mdl';
import {
  CourseItem
} from './../model/index';
import { FormsModule } from '@angular/forms';
import { CMModule } from '../cm/index';
import { AppStateInjector } from '../model/app-state.injector';

describe('CourseItemComponent', () => {

  let fixture;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [ MdlModule, FormsModule, CMModule ],
      declarations: [CourseItemComponent, TestComponent],
      providers: [AppStateInjector]
    });
    TestBed.compileComponents().then( () => {
      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
    });
  }));


  it('should toggle the item state if the mdl-list-item-primary-content is clicked', async(( ) => {

      let courseItemComponent = fixture.debugElement.query(By.directive(CourseItemComponent)).componentInstance;

      spyOn(courseItemComponent, 'toggleItem').and.callThrough();

      let listItemContent = fixture.debugElement.query(By.directive(MdlListItemPrimaryContentComponent)).nativeElement;

      expect(courseItemComponent.item.selected).toBe(false);

      listItemContent.click();

      expect(courseItemComponent.toggleItem).toHaveBeenCalled();

  }));

  it('should change the item selection state on checkbox-click', async(( ) => {

      let courseItemComponent = fixture.debugElement.query(By.directive(CourseItemComponent)).componentInstance;
      let checkbox = fixture.debugElement.query(By.directive(MdlCheckboxComponent)).nativeElement;

      expect(courseItemComponent.item.selected).toBe(false);

      checkbox.click();

      expect(courseItemComponent.item.selected).toBe(true);

  }));

});


@Component({
  selector: 'test-component',
  template: '<mdl-list><course-item [item]="item"></course-item></mdl-list>'
})
class TestComponent {
  public item = new CourseItem('Grundlagen', 'Projekt erstellen, Arbeiten mit Angular CLI, Komponenten', false);
}
