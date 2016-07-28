import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import { MDL_DIRECTIVES } from 'angular2-mdl';
import { Item } from './../model/item';
import { ItemsService } from './../model/items.service';
import { Observable } from 'rxjs/Rx';
import { CourseItemComponent } from './../course-item/course-item.component';
import { ReCaptchaComponent } from './../re-captcha/re-captcha.component';
import { CHECK_NO_ROBOT_TOKEN } from './../consts';


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
  private checkToken: boolean;
  public isDataSend = false;
  public isSendError = false;

  constructor(
    private itemsService: ItemsService,
    @Inject(CHECK_NO_ROBOT_TOKEN) private checkNoRobotToken: boolean) {
    this.checkToken = checkNoRobotToken;
  }

  public ngOnInit() {
    this.isLoading = true;
    this.obsItems = this.itemsService.loadItems();

    this.obsItems.subscribe((d) => {
      this.items = d;
      this.isLoading = false;
    }, (error) => {
      this.isHttpError = true;
      this.isLoading = false;
    });

  }

  public hasMissingFields(): boolean {
    let atLeastOneItemSelected = this.items ? this.items.filter(item => item.selected) : [];

    let noContact = this.contact ? (this.contact.length === 0) : true;

    let noAttendies = this.countOfAttendies ? (Number(this.countOfAttendies) === 0) : true;

    let noToken = this.checkToken ? (this.token ? this.token.length === 0 : true) : false;

    return atLeastOneItemSelected.length === 0 || noContact || noAttendies || noToken;
  }

  public onToken({token}) {
    // how to verify https://developers.google.com/recaptcha/docs/verify
    this.token = token;
  }

  public send() {
    console.log('send');
    if (this.hasMissingFields()) {
      console.log('rejected');
      return;
    }
    let p = this.itemsService.sendSelections({
        items: this.items.filter(item => item.selected),
      contact: this.contact,
      countOfAtendies: this.countOfAttendies
    }, this.token);
    p.then( () => {
      this.isDataSend = true;
      console.log('ok');
    });
    p.catch( () => {
      this.isDataSend = true;
      this.isSendError = true;
      console.log('error');
    });
  }
}
