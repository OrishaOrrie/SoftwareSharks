import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './core/routing/app-routing.module';
import { HomeComponent } from './views/home/home.component';
import { DashComponent } from './views/dash/dash.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { LoginComponent } from './views/login/login.component';
import { ParticlesModule } from 'angular-particle';
import { UiModule } from './ui/ui.module';
import { APP_BASE_HREF } from '@angular/common';
import { AuthGuard } from './core/auth.guard';
import { CoreModule } from './core/core.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
describe('AppComponent', () => {
  beforeEach(async(() => {
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
        AppRoutingModule,
        UiModule,
        ParticlesModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue : '/' },
        AuthGuard
    ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Ninshiki'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Ninshiki');
  }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to ss-dashboard!');
  // }));
});
