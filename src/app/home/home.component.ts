import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from '@angular/forms';

import { CourseItem } from './../model/course-item';
import { ItemsService } from './../model/items.service';
import { SITE_KEY } from '../consts';
import { AppStateService } from '../model/app-state.service';
import { AppState } from '../model/app-state';

import { CmCollectionValidators } from './../cm/index';


@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {


  public items: CourseItem[];
  public selectedItems: CourseItem[] = [];
  public isHttpError = false;
  public isLoading = false;
  private token: string;
  public isDataSend = false;
  public isSendError = false;

  private contactControl          = new FormControl('', Validators.required);
  private countOfAttendiesControl = new FormControl('', Validators.required);
  private selectedItemsControl    = new FormControl(this.selectedItems, CmCollectionValidators.atLeastOneItemSelected);

  public form: FormGroup;

  constructor(
    private itemsService: ItemsService,
    @Inject(SITE_KEY) public sitekey: string,
    private appStateService: AppStateService,
    private formBuilder: FormBuilder) {
  }



  public ngOnInit() {

    this.appStateService.getAppState().subscribe( (appState) => {
      this.isLoading    = appState.uiState.isLoading;
      this.isHttpError  = appState.uiState.isHttpError;
      this.items        = appState.items;

      this.form = this.formBuilder.group({
        'contact': this.contactControl,
        'countOfAttendies': this.countOfAttendiesControl,
        'selectedItems': this.selectedItemsControl
      });
      //
      // this.form.valueChanges
      //   .subscribe((formValues) => {
      //     // console.log(this.form.controls['selectedItems']);
      //     // console.log('Model Driven Form valid value: ', this.form.valid, JSON.stringify(formValues));
      //   });

    });


  }

  public onToken({token}) {
    this.token = token;
  }

  public send() {
    if (!this.form.valid) {
      return;
    }
    let appState = new AppState();
    appState.items = this.items.filter(item => item.selected);
    appState.contact = this.form.value.contact;
    appState.countOfAtendies = this.form.value.countOfAttendies;

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
