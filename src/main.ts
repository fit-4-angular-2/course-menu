import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import {
  AppComponent,
  environment,
  appRouterProviders,
  InMemoryDataService
} from './app/';
import {
  XHRBackend,
  HTTP_PROVIDERS
} from '@angular/http';
import {
  InMemoryBackendService,
  InMemoryBackendConfig,
  SEED_DATA
} from 'angular2-in-memory-web-api';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent,  [
  appRouterProviders,
  HTTP_PROVIDERS,
  { provide: XHRBackend, useClass: InMemoryBackendService },
  { provide: SEED_DATA, useClass: InMemoryDataService },
  { provide: InMemoryBackendConfig, useValue: {delay: 600}}
]).catch(err => console.error(err));

