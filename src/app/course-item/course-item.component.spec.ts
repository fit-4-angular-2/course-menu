
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
import { Item } from './../model/item';
import { FormsModule } from '@angular/forms';



describe('CourseItemComponent', () => {

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [ MdlModule, FormsModule ],
      declarations: [CourseItemComponent, TestComponent],
    });

  }));


  it('should toggle the item state if the mdl-list-item-primary-content is clicked', async(( ) => {

    TestBed.compileComponents().then( () => {
      let fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      let courseItemComponent = fixture.debugElement.query(By.directive(CourseItemComponent)).componentInstance;

      let listItemContent = fixture.debugElement.query(By.directive(MdlListItemPrimaryContentComponent)).nativeElement;

      expect(courseItemComponent.item.selected).toBe(false);

      listItemContent.click();

      expect(courseItemComponent.item.selected).toBe(true);
    });

  }));

  it('should change the item selection state on checkbox-click', async(( ) => {

    TestBed.compileComponents().then( () => {
      let fixture = TestBed.createComponent(TestComponent);
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
  template: '<mdl-list><course-item [item]="item"></course-item></mdl-list>'
})
class TestComponent {
  public item = new Item('Grundlagen', 'Projekt erstellen, Arbeiten mit Angular CLI, Komponenten', false);
}
