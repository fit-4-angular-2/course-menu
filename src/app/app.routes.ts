import {
  provideRouter,
  RouterConfig
} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ImprintComponent } from './imprint/imprint.component';

const appRoutes: RouterConfig = [
  { path: 'imprint', component: ImprintComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: ''}
];


const routes: RouterConfig = [
  ...appRoutes
];

export const appRouterProviders = [
  provideRouter(routes)
];
