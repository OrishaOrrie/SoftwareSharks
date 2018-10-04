import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';

import { ParticlesModule } from 'angular-particle';
import { AngularFireModule } from '@angular/fire';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { DashComponent } from './views/dash/dash.component';
import { UiModule } from './ui/ui.module';
import { environment } from '../environments/environment';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './views/login/login.component';
import { AppRoutingModule } from './core/routing/app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashComponent,
    PageNotFoundComponent,
    UserProfileComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UiModule,
    ParticlesModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    CoreModule,
    AppRoutingModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
