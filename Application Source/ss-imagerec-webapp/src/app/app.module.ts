import { ContactUsComponent } from './contact-us/contact-us.component';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { BrowserXhr } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import { MatGridListModule } from '@angular/material';
import { UtilitiesComponent } from './utilities/utilities.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from './../environments/environment';
import { LocationStrategy, HashLocationStrategy } from '../../node_modules/@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ImageuploadComponent,
    UtilitiesComponent,
    ContactUsComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatGridListModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
