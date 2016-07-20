import {
  Component,
  OnInit
} from '@angular/core';
import {
  MDL_DIRECTIVES
} from 'angular2-mdl';
import {
  ROUTER_DIRECTIVES,
  Router, NavigationError
} from '@angular/router';
import { HomeComponent } from './home/home.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    MDL_DIRECTIVES,
    ROUTER_DIRECTIVES
  ],
  precompile: [ HomeComponent ]
})
export class AppComponent implements OnInit {
  public title = 'CourseMenu';

  constructor(private router: Router) {}

  public ngOnInit() {
    this.router.events.subscribe( (e) => {
      if (e instanceof NavigationError) {
        this.gotoHome();
      }
    });
  }

  public gotoHome() {
    this.router.navigate(['/']);
  }
}

