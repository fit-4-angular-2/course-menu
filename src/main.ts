import { bootstrap } from '@angular/platform-browser-dynamic';
import {
  enableProdMode
} from '@angular/core';
import {
  AppComponent,
  environment,
  appRouterProviders
} from './app/';
import {
  HTTP_PROVIDERS
} from '@angular/http';
import {
  SERVER_URL_TOKEN
} from './app/consts';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent,  [
  appRouterProviders,
  HTTP_PROVIDERS,
  { provide: SERVER_URL_TOKEN, useValue: environment.serverUrl }
]).catch(err => console.error(err));

