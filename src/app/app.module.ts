import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  FormsModule,
  ReactiveFormsModule } from '@angular/forms';
import { HttpModule, XSRFStrategy, CookieXSRFStrategy, Request } from '@angular/http';
import { MdlModule } from 'angular2-mdl';
import { RouterModule } from '@angular/router';
import { AppComponent, AppRoutes } from './app.component';
import { SERVER_URL_TOKEN, SITE_KEY } from './consts';
import { environment } from './../environments/environment';
import { ImprintComponent } from './imprint/imprint.component';
import { HomeComponent } from './home/home.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { ReCaptchaComponent } from './re-captcha/re-captcha.component';
import { ItemsService } from './model/items.service';
import { AppStateService } from './model/app-state.service';
import { CMModule } from './cm/index';
import { AppStateInjector } from './model/app-state.injector';
import { CourseMenuActionModule } from './actions/index';


export class NoopStrategy implements XSRFStrategy {

  public configureRequest(req: Request): void {
    console.log('configure', req);
  }
}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MdlModule,
    CMModule,
    CourseMenuActionModule.forRoot(),
    RouterModule.forRoot(AppRoutes)
  ],
  declarations: [
    CourseItemComponent,
    AppComponent,
    ImprintComponent,
    HomeComponent,
    ReCaptchaComponent
  ],
  providers: [
    ItemsService,
    AppStateInjector,
    AppStateService,
    { provide: SERVER_URL_TOKEN, useValue: environment.serverUrl },
    { provide: SITE_KEY, useValue: '6LeEuiUTAAAAAAHBatXPYkA5YrJj7i6YynkxFqsX'},
    { provide: XSRFStrategy, useClass: NoopStrategy }
  ],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
