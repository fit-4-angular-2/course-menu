import { Component } from '@angular/core';
import { MDL_LAYOUT_DIRECTIVES } from 'angular2-mdl';
import {
  ROUTER_DIRECTIVES,
  Router
} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [
    MDL_LAYOUT_DIRECTIVES,
    ROUTER_DIRECTIVES
  ]
})
export class AppComponent {
  public title = 'CourseMenu';

  constructor(private router: Router) {}

  public gotoHome() {
    this.router.navigate(['/']);
  }

}

