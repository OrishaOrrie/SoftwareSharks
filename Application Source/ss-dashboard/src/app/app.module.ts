import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashComponent } from './dash/dash.component';
import { UiModule } from './ui/ui.module';
import { ParticlesModule } from 'angular-particle';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from './environment/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashComponent
  ],
  imports: [
    BrowserModule,
    UiModule,
    ParticlesModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
