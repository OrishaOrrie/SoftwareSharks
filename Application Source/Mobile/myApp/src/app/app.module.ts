/**
 * File Name:       app.module.ts
 * Version Number:  v1.1
 * Author:          Orisha Orrie
 * Project Name:    Ninshiki
 * Organization:    Software Sharks
 * User Manual:     Refer to https://github.com/OrishaOrrie/SoftwareSharks/blob/master/Documentation/User%20Manual.pdf
 * Update History:
 * ------------------------------------------
 * Date         Author		Description
 * 20/07/2018   Orisha		Created component	
 * 20/07/2018   Orisha    Extra pages added here 	
 * ------------------------------------------
 * Functional Description:
 *  Main app component interface. If a new page is added, it must be declared here.
 */

import { ModelLoaderProvider } from './../providers/model-loader/model-loader';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { FeedbackPage } from './../pages/feedback/feedback';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UtilitiesPage } from '../pages/utilities/utilities';
import { ImagerecPage } from '../pages/imagerec/imagerec';
import { ResultsPage } from '../pages/results/results';
import { QuoteBuilderPage } from '../pages/quote-builder/quote-builder';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { Firebase } from '@ionic-native/firebase';
import { Geolocation } from '@ionic-native/geolocation';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule /*, AngularFireDatabase,*/ } from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { MatCardModule, MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from './../environments/environment';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { QuotationProvider } from '../providers/quotation/quotation';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    UtilitiesPage,
    ImagerecPage,
    FeedbackPage,
    ResultsPage,
    QuoteBuilderPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: false
   }),
    HttpModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatCardModule,
    MatTableModule,
    CdkTableModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    UtilitiesPage,
    ImagerecPage,
    FeedbackPage,
    ResultsPage,
    QuoteBuilderPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    AngularFirestoreModule,
    Firebase,
    ModelLoaderProvider,
    Geolocation,
    QuotationProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {

}
