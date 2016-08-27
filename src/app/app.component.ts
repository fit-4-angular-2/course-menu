import {
  Component,
  OnInit
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
import { AppStateService } from './model/app-state.service';

export const AppRoutes: [Route] = [
  { path: 'imprint', component: ImprintComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: ''}
];


@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent implements OnInit {
  public title = 'Angular 2 CourseMenu';

  constructor(private router: Router,  private appStateService: AppStateService) {}

  public ngOnInit() {
    this.appStateService.dispatchAction(LoadCourseItemsAction);
  }

  public gotoHome() {
    this.router.navigate(['/']);
  }
}

