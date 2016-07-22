import {
  Component,
  OnInit
} from '@angular/core';
import { MDL_DIRECTIVES } from 'angular2-mdl';
import { Item } from './../model/item';
import { ItemsService } from './../model/items.service';
import { Observable } from 'rxjs/Rx';
import { CourseItemComponent } from './../course-item/course-item.component';
import { ReCaptchaComponent } from './../re-captcha/re-captcha.component';


@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [ MDL_DIRECTIVES, CourseItemComponent, ReCaptchaComponent ],
  providers: [ ]
})
export class HomeComponent implements OnInit {

  public obsItems: Observable<Item[]> = null;
  public items: Item[];
  public isHttpError = false;
  public isLoading = true;
  public contact: String;
  public countOfAttendies: String;
  private token: string;

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

    let noContact = this.contact ? (this.contact.length === 0) : true;

    let noAttendies = this.countOfAttendies ? (Number(this.countOfAttendies) === 0) : true;

    let noToken = this.token ? this.token.length === 0 : true;

    return atLeastOneItemSelected.length === 0 || noContact || noAttendies || noToken;
  }

  public onToken({token}) {
    // how to verify https://developers.google.com/recaptcha/docs/verify
    this.token = token;
  }

  // public send() {
  //   if (this.hasMissingFields()) {
  //     return;
  //   }
  //   console.log('send');
  // }
}
