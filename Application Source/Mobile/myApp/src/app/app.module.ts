import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UtilitiesPage } from '../pages/utilities/utilities';
import { ImagerecPage } from '../pages/imagerec/imagerec';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { Firebase } from '@ionic-native/firebase';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule, AngularFireDatabase, } from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { MatCardModule, MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from './../environments/environment';
import { AngularFireStorageModule } from 'angularfire2/storage';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    UtilitiesPage,
    ImagerecPage
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
    ImagerecPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    AngularFirestoreModule,
    Firebase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {

}
