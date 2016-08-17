import {
  Component,
  Input
} from '@angular/core';
import { Item } from './../model/item';


@Component({
  moduleId: module.id,
  selector: 'course-item',
  templateUrl: 'course-item.component.html',
  styleUrls: ['course-item.component.css']
})
export class CourseItemComponent {

  @Input() public item: Item = null;
  @Input() public index: number = 1;

  public toggleItem(item: Item) {
    item.selected = !item.selected;
  }

  public clickCheckbox(event) {
    // stop the event bubbling to avoid that this click is handled as a click on the mdl-list-item.
    // this would result in an item.toggle again - e.g. the checkbox state did not change.
    event.stopPropagation();
  }
}
