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

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {


  public items: CourseItem[];
  public isHttpError = false;
  public isLoading = false;
  public contact: String;
  public countOfAttendies: String;
  private token: string;
  public isDataSend = false;
  public isSendError = false;

  constructor(
    private itemsService: ItemsService,
    @Inject(SITE_KEY) public sitekey: string,
    private appStateService: AppStateService) {
  }

  public ngOnInit() {
    this.appStateService.getAppState().subscribe( (appState) => {
      this.isLoading    = appState.uiState.isLoading;
      this.isHttpError  = appState.uiState.isHttpError;
      this.items        = appState.items;
    });
  }

  get hasMissingFields(): boolean {
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
    if (this.hasMissingFields) {
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
