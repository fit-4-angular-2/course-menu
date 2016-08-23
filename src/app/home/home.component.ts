import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import { CourseItem } from './../model/course-item';
import { ItemsService } from './../model/items.service';
import { SITE_KEY } from '../consts';
import { AppStateService } from '../model/app-state.service';
import { AppState } from '../model/app-state';
import { LoadCourseItemsAction } from '../actions/load-course-items-action';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {


  public items: CourseItem[];
  public isHttpError = false;
  public isLoading = true;
  public contact: String;
  public countOfAttendies: String;
  private token: string;
  public isDataSend = false;
  public isSendError = false;

  constructor(
    private itemsService: ItemsService,
    @Inject(SITE_KEY) private sitekey: string,
    private appStateService: AppStateService) {
  }

  get courseItems() {
    return this.appStateService.getAppState().map((state: AppState) =>  state.items);
  }

  public ngOnInit() {

    this.appStateService.dispatchAction(LoadCourseItemsAction);

    this.isLoading = true;
    let p = this.itemsService.loadItems();
    p.then( (items) => {
      this.items = items;
      this.isLoading = false;
    });
    p.catch( (error) => {
      this.isHttpError = true;
      this.isLoading = false;
    });
    // usually this is for testing :(
    return p;
  }

  public hasMissingFields(): boolean {
    let atLeastOneItemSelected = this.items ? this.items.filter(item => item.selected) : [];

    let noContact = this.contact ? (this.contact.length === 0) : true;

    let noAttendies = this.countOfAttendies ? (Number(this.countOfAttendies) === 0) : true;

    let noToken = this.token ? this.token.length === 0 : true;

    return atLeastOneItemSelected.length === 0 || noContact || noAttendies || noToken;
  }

  public onToken({token}) {
    this.token = token;
  }

  public send() {
    if (this.hasMissingFields()) {
      return;
    }
    let appState = new AppState();
    appState.items = this.items.filter(item => item.selected);
    appState.contact = this.contact;
    appState.countOfAtendies = this.countOfAttendies;

    let p = this.itemsService.sendSelections(appState, this.token);
    p.then( () => {
      this.isDataSend = true;
    });
    p.catch( () => {
      this.isDataSend = true;
      this.isSendError = true;
    });
    // usually this is for testing :(
    return p;
  }
}
