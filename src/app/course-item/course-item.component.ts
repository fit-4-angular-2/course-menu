import {
  Component,
  Input
} from '@angular/core';
import {
  CourseItem,
  AppStateService
} from './../model/index';



@Component({
  selector: 'course-item',
  templateUrl: 'course-item.component.html',
  styleUrls: ['course-item.component.css']
})
export class CourseItemComponent {

  @Input() public item: CourseItem = null;

  constructor(private appStateService: AppStateService) {}

  public toggleItem(item: CourseItem) {
    item.selected = !item.selected;
  }

  public clickCheckbox(event) {
    // stop the event bubbling to avoid that this click is handled as a click on the mdl-list-item.
    // this would result in an item.toggle again - e.g. the checkbox state did not change.
    event.stopPropagation();
  }
}
