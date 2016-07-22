import {
  Component,
  OnInit,
  DoCheck
} from '@angular/core';
import { MDL_DIRECTIVES } from 'angular2-mdl';
import { Item } from './../model/item';
import { ItemsService } from './../model/items.service';
import { Observable } from 'rxjs/Rx';
import { CourseItemComponent } from './../course-item/course-item.component';


@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [ MDL_DIRECTIVES, CourseItemComponent ],
  providers: [ ]
})
export class HomeComponent implements OnInit {

  public obsItems: Observable<Item[]> = null;
  public items: Item[];
  public isHttpError = false;
  public isLoading = true;
  public contact: String;
  public countOfAttendies: number;

  constructor(private itemsService: ItemsService) {}

  public ngOnInit() {
    this.isLoading = true;
    this.obsItems = this.itemsService.loadItems();

    this.obsItems.subscribe((d) => {
      this.items = d;
      this.isLoading = false;
    }, (error) => {
      this.isHttpError = true;
    });

  }

  public hasMissingFields(): boolean {
    let atLeastOneItemSelected = this.items ? this.items.filter(item => item.selected) : [];

    return atLeastOneItemSelected.length === 0;
  }
}
