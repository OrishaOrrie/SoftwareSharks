import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { RouterModule, Routes } from '@angular/router';

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
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { AuthGuard } from './core/auth.guard';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  { path: 'profile', component: UserProfileComponent,  canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashComponent,
    PageNotFoundComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    UiModule,
    ParticlesModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    CoreModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
