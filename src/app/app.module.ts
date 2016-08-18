import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdlModule } from 'angular2-mdl';
import { RouterModule } from '@angular/router';
import { AppComponent, AppRoutes } from './app.component';
import { SERVER_URL_TOKEN, SITE_KEY } from './consts';
import { environment } from './environment';
import { ImprintComponent } from './imprint/imprint.component';
import { HomeComponent } from './home/home.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { ReCaptchaComponent } from './re-captcha/re-captcha.component';
import { ItemsService } from './model/items.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdlModule,
    RouterModule.forRoot(AppRoutes)
  ],
  declarations: [
    AppComponent,
    ImprintComponent,
    HomeComponent,
    CourseItemComponent,
    ReCaptchaComponent
  ],
  providers: [
    ItemsService,
    { provide: SERVER_URL_TOKEN, useValue: environment.serverUrl },
    { provide: SITE_KEY, useValue: '6LeEuiUTAAAAAAHBatXPYkA5YrJj7i6YynkxFqsX'}
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
