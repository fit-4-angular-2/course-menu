import {
  provideRouter,
  RouterConfig
} from '@angular/router';
import { HomeComponent } from './home.component';
import { ImprintComponent } from './imprint.component';

const appRoutes: RouterConfig = [
  { path: '', component: HomeComponent},
  { path: 'imprint', component: ImprintComponent }
];


const routes: RouterConfig = [
  ...appRoutes
];

export const appRouterProviders = [
  provideRouter(routes)
];
