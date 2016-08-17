import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ImprintComponent } from './imprint/imprint.component';

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
export class AppComponent {
  public title = 'Angular 2 CourseMenu';

  constructor(private router: Router) {}

  public gotoHome() {
    this.router.navigate(['/']);
  }
}

