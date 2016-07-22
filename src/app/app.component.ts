import {
  Component
} from '@angular/core';
import {
  MDL_DIRECTIVES
} from 'angular2-mdl';
import {
  ROUTER_DIRECTIVES,
  Router
} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemsService } from './model/items.service';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    MDL_DIRECTIVES,
    ROUTER_DIRECTIVES
  ],
  precompile: [ HomeComponent ],
  providers: [ ItemsService ]
})
export class AppComponent {
  public title = 'Angular 2 CourseMenu';

  constructor(private router: Router) {}

  public gotoHome() {
    this.router.navigate(['/']);
  }
}

