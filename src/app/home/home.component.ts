import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { CourseItem } from './../model/course-item';
import { ItemsService } from './../model/items.service';
import { SITE_KEY } from '../consts';
import { AppStateService } from '../model/app-state.service';
import { MenuSelection } from '../model/app-state';

import { CmCollectionValidators } from './../cm/index';
import {
  SendMenuSelectionAction,
  MENU_SELECTION,
  TOKEN
} from '../actions/index';


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
  public isDataSend = false;

  private contactControl          = new FormControl('', Validators.required);
  private countOfAttendiesControl = new FormControl('', Validators.required);
  private selectedItemsControl    = new FormControl([], CmCollectionValidators.atLeastOneItemSelected);
  private tokenControl            = new FormControl(null);

  public form: FormGroup;

  constructor(
    private itemsService: ItemsService,
    @Inject(SITE_KEY) public sitekey: string,
    private appStateService: AppStateService,
    private formBuilder: FormBuilder) {
  }

  public ngOnInit() {

    this.appStateService.getAppState().subscribe( (appState) => {
      // we could keep the uiState directily but how do we know
      // what information this component is using from the uiState?
      this.isLoading    = appState.uiState.isLoading;
      this.isHttpError  = appState.uiState.isHttpError;
      this.isDataSend   = appState.uiState.isDataSend;

      this.items        = appState.items;

      this.form = this.formBuilder.group({
        'contact': this.contactControl,
        'countOfAttendies': this.countOfAttendiesControl,
        'selectedItems': this.selectedItemsControl,
        'token': this.tokenControl
      });
    });

  }


  public send() {
    if (!this.form.valid) {
      return;
    }

    let menuSelection = MenuSelection.createEmptyState();
    menuSelection.selectedItems   = this.form.value.selectedItems;
    menuSelection.contact         = this.form.value.contact;
    menuSelection.countOfAtendies = this.form.value.countOfAttendies;

    this.appStateService.dispatchAction(SendMenuSelectionAction, [
      {provide: MENU_SELECTION, useValue: menuSelection },
      {provide: TOKEN, useValue: this.form.value.token}
    ]);

  }
}
