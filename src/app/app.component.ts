import {
  Component,
  OnInit,
  Injector
} from '@angular/core';
import {
  Router,
  Route
} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ImprintComponent } from './imprint/imprint.component';
import {
  LoadCourseItemsAction
} from './actions/load-course-items.action';
import {AppStateService} from './model/app-state.service';
import { AppStateInjector } from './model/app-state.injector';

export const AppRoutes: [Route] = [
  { path: 'imprint', component: ImprintComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: ''}
];



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public title = 'Angular 2 CourseMenu';

  constructor(
    private router: Router,
    private appStateService: AppStateService,
    private injector: Injector,
    private appStateInjector: AppStateInjector) {

    //this.appStateInjector.injector = this.injector;
    //console.log('app', this.injector.get(LoadCourseItemsAction));

  }

  public ngOnInit() {
    this.appStateService.dispatchAction(LoadCourseItemsAction);
  }

  public gotoHome() {
    this.router.navigate(['/']);
  }
}

