import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../environments/environment';
import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../views/home/home.component';
import { DashComponent } from '../views/dash/dash.component';
import { PageNotFoundComponent } from '../views/page-not-found/page-not-found.component';
import { UserProfileComponent } from '../views/user-profile/user-profile.component';
import { LoginComponent } from '../views/login/login.component';
import { UiModule } from '../ui/ui.module';
import { APP_BASE_HREF } from '@angular/common';
import { CoreModule } from './core.module';
import { BrowserModule } from '@angular/platform-browser';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {

    TestBed.configureTestingModule({
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
        CoreModule,
        UiModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AppRoutingModule
      ],
      providers: [AuthGuard, AuthService, {provide: APP_BASE_HREF, useValue : '/' }]
    });

    authGuard = TestBed.get(AuthGuard);
    authServiceSpy = TestBed.get(AuthService);
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
