import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { RouterModule, Routes } from '@angular/router';

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

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashComponent, canActivate: [AuthGuard] },
  { path: '',
    redirectTo: '/home',
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
    UserProfileComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    UiModule,
    ParticlesModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    CoreModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
