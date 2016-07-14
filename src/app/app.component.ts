import { Component } from '@angular/core';
import { MDL_DIRECTIVES } from 'angular2-mdl';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ MDL_DIRECTIVES ]
})
export class AppComponent {
  title = 'app works!';
}
