import {
  Component,
  OnInit
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

  public items: Observable<Item[]> = null;
  public isHttpError = false;
  public isLoading = true;

  constructor(private itemsService: ItemsService) {}

  public ngOnInit() {
    this.isLoading = true;
    this.items = this.itemsService.loadItems(false);

    this.items.subscribe((d) => {
      this.isLoading = false;
    }, (error) => {
      this.isHttpError = true;
    });

  }

}
